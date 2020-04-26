const express = require('express');
const router = express.Router();
const _ = require('lodash');
const fs = require('fs');


const jwtService = require('../services/JwtService');
const loggerService = require('../services/LoggingService');
const authorizationService = require('../services/AuthorizationService');


router.get('/routes', async function(req, res, next) {
	let response = {};
	try {
		let token = req.headers['x-access-token'] || req.headers['authorization'];
		console.log('Token: ', token);
		if (!_.isNil(token)) {
			token = token.replace('Bearer ',''); 
		}
		const userData = await jwtService.verify(token);
		const user_unique_id = userData.unique_id;
		console.log('userData', userData);
		let routes = await authorizationService.getRoutes(user_unique_id);
		if (routes.success) {
			response = routes.data;
		}
	} catch (ex) {
		console.log(ex);
		loggerService.getDefaultLogger().error('[ROUTE]-[INDEX]-ERROR: Exception get request at /auth/login route: ' + JSON.stringify(ex));
	}

	res.send(response);
});

router.post('/add_routes', async function(req, res, next) {
	let response = {};
	try {
		let token = req.headers['x-access-token'] || req.headers['authorization'];
		console.log('Token: ', token);
		if (!_.isNil(token)) {
			token = token.replace('Bearer ',''); 
		}
		const userData = await jwtService.verify(token);
		const user_unique_id = userData.data.unique_id;

		let routes = await authorizationService.addRoutes(user_unique_id, req.body);
		if (routes.success) {
			response = routes.data;
		}
	} catch (ex) {
		console.log(ex);
		loggerService.getDefaultLogger().error('[ROUTE]-[INDEX]-ERROR: Exception get request at /auth/login route: ' + JSON.stringify(ex));
	}

	res.send(response);
});

router.get('/navigations', async function(req, res, next) {
	let response = {};
	try {
		let token = req.headers['x-access-token'] || req.headers['authorization'];
		console.log('Token: ', token);
		if (!_.isNil(token)) {
			token = token.replace('Bearer ',''); 
			
		} else {
			return res.status(401).send({
				message: 'Unauthorized Access. Please Signin'
			});
		}
		const userData = await jwtService.verify(token);
		const user_unique_id = userData.unique_id;
		console.log('userData', userData);
		let routes = await authorizationService.getNavigations();
		if (routes.success) {
			response = routes.data;
		}
	} catch (ex) {
		console.log(ex);
		loggerService.getDefaultLogger().error('[ROUTE]-[INDEX]-ERROR: Exception get request at /auth/login route: ' + JSON.stringify(ex));
	}

	res.send(response);
});
module.exports = router;
