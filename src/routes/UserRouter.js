'use strict'

const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const _ = require('lodash');

const loggerService = require('../services/LoggingService');
const userService = require('../services/userService');



router.post('/login', async function(req, res, next) {
	let response = {};
	try {
		let email = req.body.email || "", pass = req.body.pass || "";

		if(!_.isEmpty(email) && !_.isEmpty(pass)) {
			let result = await userService.getUser(email, pass);
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