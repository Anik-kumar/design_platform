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


router.post('/send-reset-pass', async function(req, res, next) {
	let response = {};
	console.log(req.body.email);

	try{
    const result = await userService.sendResetPassVerification(req.body.email);
    
    if(result.success && _.isNil(result.error) && _.isEmpty(result.error)) {
      response.message = "User reset password verification is sent";
      response.success = true;
      response.error = null;
    } else {
      response.message = "User password not updated";
      response.success = false;
      response.error = result.error;
    }
	} catch (err) {
		console.log(err);
  }
  
  res.send(response);
});


router.post('/new-design', async function(req, res, next){
  let response = {};
	console.log(req.body.email);

	try{
    const result = await userService.uploadDesign(req.body.postTitle, req.body.title, req.body.type, req.body.tags, req.body.description);
    
    if(result.success && _.isNil(result.error) && _.isEmpty(result.error)) {
      response.message = "User reset password verification is sent";
      response.success = true;
      response.error = null;
    } else {
      response.message = "User password not updated";
      response.success = false;
      response.error = result.error;
    }
	} catch (err) {
		console.log(err);
  }
  
  res.send(response);
});


router.get('/get-designs', async (req, res, next) => {
  let response = {};
  console.log("getdesigns => ", req.user_id);
  if(_.isNil(req.user_id)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }
  try{
    const result = await userService.getDesigns(req.user_id);
    console.log('Get Design Result', result);
    if(result.success && !_.isNil(result.error)) {
      response.data = result.data;
      response.message = "User designs is retrived";
      response.error = null;
      response.success = true;
    }else {
      response.data = result.data;
      response.message = "User designs is NOT retrived";
      response.error = "Error in getDesignsRouter";
      response.success = false;
    }
    res.status(200);
  } catch(error) {
    console.log("Exception error in UserRouter /get-designs. ", error);
    response.message = "Exception error in /get-designs";
    response.error = error;
    response.success = false;
  }

  return res.send(response);

});





module.exports = router;
