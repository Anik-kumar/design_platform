const express = require('express');
const router = express.Router();
const _ = require('lodash');

const loggerService = require('../services/LoggingService');
const userService = require('../services/UserService');
const authService = require('../services/AuthService');

router.get('/ink', (req, res, next) => {
	console.log(' This is auth routes /ink');
	res.send('AUth Route');

});

router.post('/login', async function(req, res, next) {
	let response = {};
	try {
		console.log(req.body);
		let email = req.body.email || "", pass = req.body.pass || "";
		if(!_.isEmpty(email) && !_.isEmpty(pass)) {
			let result = await userService.findUserByEmailAndPassword(email, pass);
			if(result.success === false ) {
				loggerService.getDefaultLogger().error('[ROUTE]-[USER]-ERROR: Query Failed at /auth/login route: ');
			} else {
				let user = result.result;
				let token = await authService.getTokenWithExpireTime(result.result.email, result.result.password, 60*60);
				response = {
					name: user.name,
					role: user.role,
					_id: user._id,
					email: user.email,
					lastLogin: user.lastLogin,
					token: token.token
				} ;
				console.log('response with token: ', response);
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
