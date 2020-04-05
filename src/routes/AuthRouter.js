const express = require('express');
const router = express.Router();
const _ = require('lodash');

const Joi = require('@hapi/joi');
const oldJoi = require('joi');



const loggerService = require('../services/LoggingService');
const userService = require('../services/UserService');
const authService = require('../services/AuthService');
const regService = require('../services/RegisterService');

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
	try{
		console.log(req.body);
		const email = req.body.email;
		const firstName = req.body.name.first;
		const lastName = req.body.name.last;
		const pass = req.body.pass;
		const phone = req.body.phone;
		const gender = req.body.gender;
		const dob = req.body.dob;


		// const address = req.body.address;

		// if( a=b || c=d)
		// if( a=b && c=d)
		let errors = [];
		if (_.isNil(email)) {
			errors.push('Email validation failed');
		}

		if (_.isNil(firstName)) {
			errors.push('FirstName validation failed');
		}

		if(!_.isEmpty(email) || !_.isEmpty(firstName) || !_.isEmpty(lastName) || !_.isEmpty(pass) || !_.isEmpty(phone) || !_.isEmpty(gender) || !_.isEmpty(dob)) {

			const user = {
				email: String,
				name: {
					first: String,
					last: String
				},
				pass: String,
				phone: String,
				gender: String,
				dob: Date,


			}



		}

	}catch(err) {
		console.error(err);

	}

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
