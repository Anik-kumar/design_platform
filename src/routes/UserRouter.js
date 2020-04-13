'use strict'

const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const _ = require('lodash');

const loggerService = require('../services/LoggingService');
const userService = require('../services/UserService');
let {ResUserModel} = require('../models/response/response.models');



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


/**
 * this route checks for duplicate emails
 */
router.post('/findEmail', async (req, res, next) => {
  let response = {};
	try {
		let email = req.body.email;

    if(!_.isEmpty(email)) {
      let result = await userService.searchDupEmail(email);

      if(result.success === false ) {
        
        response = {
          "found": false,
          "message": "User mail does not exits",
          "error": ""
        }
      } else {
        
        response = {
          "found": true,
          "message": "User mail exits",
          "error": ""
        }
        // console.log('response with token: ', response);
        
      }
    } else {
      response = {
        "found": false,
        "error": true,
        "message": "Empty Parameter"
      };
    }

	} catch (ex) {
		console.log(ex);
		loggerService.getDefaultLogger().error('[ROUTE]-[INDEX]-ERROR: Exception get request at /auth/login route: ' + JSON.stringify(ex));
	}

	res.send(response);

});




module.exports = router;
