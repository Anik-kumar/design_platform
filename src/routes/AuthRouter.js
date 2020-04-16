const express = require('express');
const router = express.Router();
const _ = require('lodash');
const fs = require('fs');

const Joi = require('@hapi/joi');
const oldJoi = require('joi');



const jwtService = require('../services/JwtService');
const loggerService = require('../services/LoggingService');
const userService = require('../services/UserService');
const authService = require('../services/AuthService');
const emailService = require('../services/email/EmailService');

router.post('/ink', (req, res, next) => {

	console.log(' This is auth routes /ink');

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


		// if(errorEmail.length > 5 || errorPass.length > 5) {
		// 	console.log("Joi Validation Error Email ,", errorEmail.error);
		// 	console.log("Joi Validation Error Password ,", errorPass.error);
		// 	response = {
		// 		"error": true,
		// 		"message": "Please Enter Valid Email or Password"
		// 	};
			
		// } else {

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
					let token = await authService.getTokenWithExpireTime(result.result.email, result.result.pass, 60*60);
					response = {
						name: user.name,
						role: user.role,
						_id: user._id,
						email: user.email,
						lastLogin: user.lastLogin,
						token: token.token
					} ;
					// console.log('response with token: ', response);
					res.set({
						'X-Auth-Token': token.token
					});
				}
			} else {
				response = {
					"error": true,
					"message": "Empty Username/Password"
				};
			}

		// }

	} catch (ex) {
		console.log(ex);
		loggerService.getDefaultLogger().error('[ROUTE]-[INDEX]-ERROR: Exception get request at /auth/login route: ' + JSON.stringify(ex));
	}

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
		dob: Joi.date().required()
	});

	try{
		// form data validation
		await regSchema.validateAsync(req.body);

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

			let content = await fs.readFile('./src/email/signup-email.html', 'utf8', (err, data) => {
				if(err) {
					return console.log("File Reading Error " , err);
				}
				
				let result = data.replace(/CONFIRM_URL/g, link);
				result = result.replace(/USER_NAME/g, tmpName);

					// sending verification email
				emailService.prepareToSendEmail(req.body.email, 'Welcome To Design Platform',result, 'Design Platform');
			});
		} catch(err) {
			console.log(err);
		}
		

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


	// if(result.success) {
	// 	console.log("Data Retrived");
	// 	console.log("Token => ", result.token);
	// 	console.log("Data => ", result.data);
	// }

	res.send(response);
});

router.post('/verifyEmail', async function(req, res, next) {
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
  
//  {data: {…}, token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…1lIn0.1IuxjLfEdp9XH-43RfD0nE2ak6Oz7gbnp-o_MZ800Wk"}
//{ data: {
//    email: "anik.kumar.sarker@gmail.com"
//    iat: 1586534375
//    exp: 1586534975
//    aud: "Client_Identity"
//    iss: "pijus.me"
//    sub: "admin@pijus.me"
//    }
//  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuaWsua3VtYXIuc2Fya2VyQGdtYWlsLmNvbSIsImlhdCI6MTU4NjUzNDM3NSwiZXhwIjoxNTg2NTM0OTc1LCJhdWQiOiJDbGllbnRfSWRlbnRpdHkiLCJpc3MiOiJwaWp1cy5tZSIsInN1YiI6ImFkbWluQHBpanVzLm1lIn0.1IuxjLfEdp9XH-43RfD0nE2ak6Oz7gbnp-o_MZ800Wk"


  console.log("---> AuthRouter => ", response);
  res.send(response);

})

module.exports = router;
