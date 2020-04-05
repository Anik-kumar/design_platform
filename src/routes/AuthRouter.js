const express = require('express');
const router = express.Router();
const _ = require('lodash');

const Joi = require('@hapi/joi');
const oldJoi = require('joi');



const loggerService = require('../services/LoggingService');
const userService = require('../services/UserService');
const authService = require('../services/AuthService');

router.post('/ink', (req, res, next) => {

	console.log(' This is auth routes /ink');

});


router.post('/login', async function(req, res, next) {
	let response = {};
	try {
		//console.log(req.body);
		let email = req.body.email || "", pass = req.body.pass || "";
		const schema = Joi.object({
			email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
			.error((errors) => {
        return errors.map(error => {
          switch (error.code) {
            case "string.email":
              return new Error('Email address is not valid');
            case "any.empty":
              return new Error('Email address empty');
          }
        })
			})
		});

		const schema2 = Joi.object().keys({
			email: Joi.string().email(),
			name: Joi.string().min(10).required()
		});

		const {error} = oldJoi.validate({'email': 'pijusds', 'name': 'sa'}, schema2);


		if(error) {
			console.log("Joi Validation Error ,", error);
		}

		//schema.validate({'email': 'pijus'});
		// try {
		// 	const value = await schema.validateAsync({ email: 'pijus'});



		// }
		// catch (err) {
			// console.log('JOI Error: ', err);
			// console.log('JOI errors: ', value.errors);
			// console.log('JOI error: ', value.error);

		// 	console.log('JOI error messaage: ', err.message + ' > ' + err.name);
		// }

		// Joi.validate();

		if(!_.isEmpty(email) && !_.isEmpty(pass)) {
			let result = await userService.findUserByEmailAndPassword(email, pass);
			if(result.success === false ) {
				loggerService.getDefaultLogger().error('[ROUTE]-[USER]-ERROR: Query Failed at /auth/login route: ');
			} else {
				let user = result.result;
				let token = await authService.getTokenWithExpireTime(result.result.email, result.result.password, 60	*60);
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
			response = {};
		}

	} catch (ex) {
		console.log(ex);
		loggerService.getDefaultLogger().error('[ROUTE]-[INDEX]-ERROR: Exception get request at /auth/login route: ' + JSON.stringify(ex));
	}

	res.send(response);
});



router.post('/registration', async function(req, res, next) {
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
		await regSchema.validateAsync(req.body);
		result = await userService.sigup(req.body);
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


// router.post('/login', async function(req, res, next) {
// 	let response = {};
// 	try {
// 		console.log(req.body);
// 		let email = req.body.email || "", pass = req.body.pass || "";
// 		//loggingService.getDefaultLogger().info('Reached Login route');
// 		if(!_.isEmpty(email) && !_.isEmpty(pass)) {
// 			let result = await userService.getUser(email, pass);
// 			console.log(result);
// 			if(result.success === false ) {
// 				loggerService.getDefaultLogger().error('[ROUTE]-[USER]-ERROR: Query Failed at /auth/login route: ');
// 			} else {
// 				response = {
// 					name: result.data.name,
// 					email: result.data.email,
// 					lastLogin: result.data.lastLogin,
// 					token: result.token
// 				}
// 			}
// 		} else {
// 			response = {};
// 		}
//
// 	} catch (ex) {
// 		console.log(ex);
// 		loggerService.getDefaultLogger().error('[ROUTE]-[INDEX]-ERROR: Exception get request at /auth/login route: ' + JSON.stringify(ex));
// 	}
//
// 	res.send(response);
// });

module.exports = router;
