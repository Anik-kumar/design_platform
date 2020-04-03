'use strict'

const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const _ = require('lodash');

const loggerService = require('../services/LoggingService');
const userService = require('../services/UserService');

router.get('/', async function(req, res, next) {
	res.send("login route");
});

router.post('/login', async function(req, res, next) {
	let response = {};
	try {
		console.log(req.body);

		let email = req.body.email || "", pass = req.body.pass || "";
		//loggingService.getDefaultLogger().info('Reached Login route');
		if(!_.isEmpty(email) && !_.isEmpty(pass)) {
			let result = await userService.getUser(email, pass);
			console.log(result);
			if(result.success === false ) {
				loggerService.getDefaultLogger().error('[ROUTE]-[USER]-ERROR: Query Failed at /user/login route: ');
			} else {
				response = {
					name: result.data.name,
					email: result.data.email,
					lastLogin: result.data.lastLogin,
					token: result.token
				}
			}
		} else {
			response = {};
		}

	} catch (ex) {
		loggerService.getDefaultLogger().error('[ROUTE]-[INDEX]-ERROR: Exception get request at /user/login route: ' + JSON.stringify(ex));
	}

	res.send(response);
});



module.exports = router;
