'use strict'

const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const _ = require('lodash');

const loggerService = require('../services/LoggingService');
const userService = require('../services/UserService');
let {ResUserModel} = require('../models/response/response.models');

router.get('/', async function(req, res, next) {
	res.send("login route");
});

/**
 * This function to login user
 * @route POST /login
 * @group Authentication - Operations about user access
 * @param {string} email.required - username or email - eg: user@domain
 * @param {string} pass.required - user's password.
 * @produces application/json
 * @consumes application/json
 * @returns {Response.UserModel} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/login', async function(req, res, next) {
	let response = ResUserModel;
	try {
		console.log(req.body);

		let email = req.body.email || "", pass = req.body.pass || "";
		//loggingService.getDefaultLogger().info('Reached Login route');
		if(!_.isEmpty(email) && !_.isEmpty(pass)) {

			let result = await userService.getUser(email, pass);
			if(result.success === false ) {
				loggerService.getDefaultLogger().error('[ROUTE]-[USER]-ERROR: Query Failed at /user/login route: ');
				response = {
					"error": true,
					"message": "Username/Password is wrong"
				}
				
			} else {
				response = {
					name: result.data.name,
					email: result.data.email,
					lastLogin: result.data.lastLogin,
					token: result.token
				}
			}
			res.status(200);
		} else {
			response = {
				"error": true,
				"message": "Username or Password is empty"
			};
			res.status(400);
		}

	} catch (ex) {
		loggerService.getDefaultLogger().error('[ROUTE]-[INDEX]-ERROR: Exception get request at /user/login route: ' + JSON.stringify(ex));
		response = {
			"error": true,
			"message": "Can't able to Login. Please try again"
		};
		res.status(400);
	}

	res.send(response);
});



module.exports = router;
