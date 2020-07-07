const express = require('express');
const router = express.Router();
const _ = require('lodash');
const fs = require('fs');
const Joi = require('@hapi/joi');
const uuid = require('uuid/v4')
const bcrypt = require('bcrypt');
const { USER_TYPE, USER_TYPE_TEXT } = require('../models/user_type.enum');
const saltRounds = 10;


const jwtService = require('../services/JwtService');
const loggerService = require('../services/LoggingService');
const userService = require('../services/UserService');
const authService = require('../services/AuthService');
const emailService = require('../services/email/EmailService');
const fileService = require('../services/FileService');
const activityService = require('../services/ActivityService');


router.get('/ink', (req, res, next) => {

	console.log(' This is auth routes /ink');
	res.status(200).send("This message is from  api/auth/ink")

});


router.post('/login', async function(req, res, next) {
	let response = {};
	try {
		//console.log(req.body);
		let email = req.body.email || "", pass = req.body.pass || "";


		const schemaEmail = Joi.object({
			email: Joi.string().email().required().messages({
				"string.email" : `"email" format is not valid`,
				"any.required" : `"email" field is required`
			})
		});
		const schemaPass = Joi.object({
			pass: Joi.string().min(10).required().messages({
				"string.min" : `"password" must be at least 6 charaters`,
				"any.required" : `"password" field is required`
			})
		});

		const errorEmail = schemaEmail.validate({'email': email});
		const errorPass = schemaPass.validate({'pass': pass});

		if(!_.isEmpty(email) && !_.isEmpty(pass)) {
			let result = await userService.findUserByEmailAndPassword(email, pass);
			if(result.success === false ) {
				loggerService.getDefaultLogger().error('[ROUTE]-[USER]-ERROR: Query Failed at /auth/login route: ');
				response = {
					"error": true,
					"message": "Username/Password is wrong"
				}
			} else {
				let user = result.result;
				let token = await authService.getTokenWithExpireTime(result.result.email, result.result.unique_id, result.result.user_type, 24*60*60);
				response = {
					name: user.name,
					unique_id: user.unique_id,
					role: user.role,
					_id: user._id,
					email: user.email,
					type: user.user_type,
					lastLogin: user.lastLogin,
					token: token.token
				};
				// console.log('response with token: ', response);
				// res.set({
				// 	'X-Auth-Token': token.token
				// });
				let reqSet = {
					'X-auth-token': token.token,
					'X-ut': user.user_type
				};

				if (user.user_type == USER_TYPE.ADMIN || user.user_type == USER_TYPE.SUPER_ADMIN || user.user_type == USER_TYPE.ROOT_USER || user.user_type == USER_TYPE.REVIEWER) {
					reqSet['X-atu'] = true;
				}
				console.log('reqSet: ', reqSet);
				res.set(reqSet);
				await activityService.addActivityLlog(user.unique_id, "User " + user.name.first + ' ' + user.name.last + ', email: ' + user.email + ', loggedin at ' + new Date().toISOString(), []);
			}
		} else {
			response = {
				"error": true,
				"message": "Empty Username/Password"
			};
		}

	} catch (ex) {
		console.log(ex);
		loggerService.getDefaultLogger().error('[ROUTE]-[INDEX]-ERROR: Exception get request at /auth/login route: ' + JSON.stringify(ex));
	}
	console.log(" User signin property ->", response);
	res.send(response);
});


router.post('/logout', async function(req, res, next) {
	let response = {};
	try {
		let user_id = req.body.userId, name = req.body.name, email = req.body.email;
		if(!_.isEmpty(user_id) && !_.isNil(user_id)) {
			await activityService.addActivityLlog(user_id, "User " + name + ', email: ' + email + ', logged out at ' + new Date().toISOString(), []);
			response = {message: 'User logged out.'}
		} else {
			response = {
				"error": true,
				"message": "Error in completing Logout process"
			};
		}
	} catch (ex) {
		console.log(ex);
		loggerService.getDefaultLogger().error('[ROUTE]-[INDEX]-ERROR: Exception get request at /auth/login route: ' + JSON.stringify(ex));
	}
	console.log(" User signin property ->", response);
	res.send(response);
});

router.post('/signup', async function(req, res, next) {
	let response = {};

	const regSchema = Joi.object({
		email: Joi.string().trim().email().required(),
		firstName: Joi.string().trim().min(3).max(20).required(),
		lastName: Joi.string().trim().min(3).max(20).required(),
		pass: Joi.string().trim().min(3).required(),
		phone: Joi.string().trim().min(3).required(),
		gender: Joi.string().trim().required(),
		dob: Joi.date().required(),
		userType: Joi.string().required()
	});

	try{
		// form data validation
		await regSchema.validateAsync(req.body);
		let userType = USER_TYPE.VISITOR;

		switch(req.body['userType']) {
			case USER_TYPE_TEXT.VISITOR:
				userType = USER_TYPE.VISITOR
				break;
			case USER_TYPE_TEXT.DESIGNER:
				userType = USER_TYPE.DESIGNER
				break;
			case USER_TYPE_TEXT.CUSTOMER:
				userType = USER_TYPE.CUSTOMER
				break;
			case USER_TYPE_TEXT.DC:
				userType = USER_TYPE.DC
				break;
			case USER_TYPE_TEXT.REVIEWER:
				userType = USER_TYPE.REVIEWER
				break;
			case USER_TYPE_TEXT.ADMIN:
				userType = USER_TYPE.ADMIN
				break;
			case USER_TYPE_TEXT.SUPER_ADMIN:
				userType = USER_TYPE.SUPER_ADMIN
				break;
		}
		req.body['userType'] = userType

		// generating verification email template
		try {
			let tmpEmail = req.body.email;
			let tmpName = req.body.firstName + " " + req.body.lastName;
			let emailVerifyToken = await jwtService.signHS256({'email': tmpEmail}, {'expiresIn': 10*60});
			let link = "http://localhost:4200/verify-email?lang=en&token=";
			if (emailVerifyToken.auth == true) {
				link += emailVerifyToken.token;
			}
			console.log(link);


			try {
				let data = await fileService.read('./src/email/signup-email.html');
				let result = data.replace(/CONFIRM_URL/g, link);
				result = result.replace(/USER_NAME/g, tmpName);
				emailService.prepareToSendEmail(req.body.email, 'Welcome To Design Platform', result, 'Design Platform');
			} catch(err) {
				console.log("File Reading Error " , err);
			}
		} catch(err) {
			console.log(err);
		}

		req.body['unique_id'] = uuid();
		req.body['pass'] = await bcrypt.hash(req.body['pass'], saltRounds);
		// registering user
		result = await userService.signup(req.body);
		if(result.success) {
			response = result.data;
		}
		res.status(200);
	}catch(err) {
		console.error(err);
		response = {
			"error": true,
			"message": err.message
		}
		res.status(400);
	}
	res.send(response);
});



router.post('/verify-email', async function(req, res, next) {
	let response = {};
	console.log(req.body.token);

	const result = await jwtService.verifyHS256(req.body.token, { 'expiresIn' : 20*60 });
	console.log("AuthRoute +> ", result);

  const userMail = result.data.email;

  let isFound = await userService.verifyUserEmail(result.data.email);

  console.log("---> AuthRouter => ", isFound);

  if(isFound.success) {
    response.message = "User email found";
    response.success = true;
    response.error = isFound.error;
  } else {
    response.message = "User email not found";
    response.success = false;
    response.error = isFound.error;
  }

	// response.Error = "";
	// response.Data = req.body;
//	response = result;
  res.status(200);

//  {data: {…}, token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…1lIn0.	1IuxjLfEdp9XH-43RfD0nE2ak6Oz7gbnp-o_MZ800Wk"}
//{ data: {
//    email: "anik.kumar.sarker@gmail.com"
//    iat: 1586534375
//    exp: 1586534975
//    aud: "Client_Identity"
//    iss: "pijus.me"
//    sub: "admin@pijus.me"
//    }
//  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.	eyJlbWFpbCI6ImFuaWsua3VtYXIuc2Fya2VyQGdtYWlsLmNvbSIsImlhdCI6MTU4NjUzNDM3NSwiZXhwIjoxNTg2NTM0OTc1LCJhdWQiOiJDbGllbnRfSWRlbnRpdHkiLCJpc3MiOiJwaWp1cy5tZSIsInN1YiI6ImFkbWluQHBpanVzLm1lIn0.1IuxjLfEdp9XH-43RfD0nE2ak6Oz7gbnp-o_MZ800Wk"


  console.log("---> AuthRouter => ", response);
  res.send(response);

});



router.post('/reset-pass', async function(req, res, next) {
	let response = {};
	console.log(req.body.token);
	let isFound;

	try {
		// const result = await jwtService.verifyHS256(req.body.token, { 'expiresIn' : 10*60 });
		// console.log("AuthRoute +> ", result);
		const email = req.body.email;
		const pass = req.body.password;

		if(!_.isNil(email) && !_.isEmpty(email) && !_.isNil(pass) && !_.isEmpty(pass)) {
			// const userMail = result.data.email;
			const encryptPass = await bcrypt.hash(pass, saltRounds);
			isFound = await authService.resetPassword(email, encryptPass);
			
			console.log("---> AuthRouter => ", isFound);

			if(isFound.success && isFound.error==null) {
				response.message = "User password updated";
				response.success = true;
				response.error = null;
				response.result = isFound.result;
			} else {
				response.message = "User password not updated";
				response.success = false;
				response.error = isFound.error;
				response.result = isFound.result;
			}
			res.status(200);
		}
		
	} catch(err) {
		console.log(err);
		response.message = "Exception Error in AuthenticationRouter /reset-pass";
		response.success = false;
		response.error = err;
		response.result = isFound.result;
		res.status(500); // Internal server error
	}
	
  
  

  console.log("---> AuthRouter => ", response);
  res.send(response);

});





module.exports = router;
