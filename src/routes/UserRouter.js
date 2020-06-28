'use strict'

const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const _ = require('lodash');

const loggerService = require('../services/LoggingService');
const userService = require('../services/UserService');
const designService = require('../services/DesignService');
const activityService = require('../services/ActivityService');
let {ResUserModel} = require('../models/response/response.models');
const { USER_TYPE, USER_TYPE_TEXT, getUserTypeTextByEnum } = require('../models/user_type.enum');


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

router.post('/findone', async (req, res, next)=> {
  let response = {};
  const adminId = req.user_id || req.headers.user_id;
  const adminType = req.user_type || req.headers.user_type;
  const searchId = req.body.search_id;
  console.log("findone => ", adminId);
  console.log("findone => ", searchId);
  if(_.isNil(adminId)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }
	try {
    let result = await userService.findUserById(searchId);

    if(result.success) {
      response = {
        "found": true,
        "message": "User mail exits",
        "error": "",
        "data": result.result
      }
    } else {
      response = {
        "found": false,
        "message": "User mail does not exits",
        "error": "",
        "data": result.result
      }
    }
    res.status(200);
	} catch (ex) {
		console.log(ex);
		loggerService.getDefaultLogger().error('[ROUTE]-[INDEX]-ERROR: Exception get request at /auth/login route: ' + JSON.stringify(ex));
	}

	return res.send(response);
})

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


router.get('/profile', async function(req, res, next) {
	let response = {};
  // console.log(req.body.email);
  // console.log(req.headers.user_id);
  console.log(req.user_id);
  
  if(_.isNil(req.user_id)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }

	try{
    const result = await userService.getProfileDetails(req.user_id);
    
    if((result.success && _.isEmpty(result.error)) || _.isNil(result.error)) {
      response.message = "User profile is details retrived";
      response.success = true;
      response.error = null;
      response.data = result.data;
    } else {
      response.message = "User profile is not found";
      response.success = false;
      response.error = result.error;
      response.data = result.data;
    }
    // response = result;
    res.status(200);
	} catch (err) {
		console.log(err);
  }
  
  res.send(response);
});


router.get('/get-all-users', async (req, res, next) => {
  let response = {};
  const adminId = req.user_id || req.headers.user_id;
  const adminType = req.user_type || req.headers.user_type;
  if(_.isNil(adminId)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }

	try{
    if(adminType >= USER_TYPE.REVIEWER) {

      const result = await userService.getAllUsers();
      if(result.success && _.isNil(result.error)) {
        response.message = "All Users are retrived";
        response.success = true;
        response.error = null;
        response.data = result.data;
      } else {
        response.message = "All Users are failed to retrive";
        response.success = false;
        response.error = result.error;
        response.data = result.data;
      }
      // response = result;
      res.status(200);
    } else {
      response.data = null;
      response.message = "Unauthorized User Access";
      response.error = "Error in /get-all-users";
      response.success = false;
    }
	} catch (err) {
    // console.log(err);
    console.log("Exception error in UserRouter /get-all-users. ", err);
    response.message = "Exception error in /get-all-users";
    response.error = error;
    response.success = false;
  }
  
  res.send(response);
});

// not used in angular
router.post('/get-users-by-type', async (req, res, next) => {
  let response = {};
  const adminId = req.user_id || req.headers.user_id;
  const adminType = req.user_type || req.headers.user_type;
  const findType = req.body.type;
  if(_.isNil(adminId)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }

	try{
    if(adminType >= USER_TYPE.REVIEWER) {

      const result = await userService.findUsersByType({"user_type": findType});
      if(result.success && _.isNil(result.error)) {
        response.message = "All Users are retrived";
        response.success = true;
        response.error = null;
        response.data = result.data;
      } else {
        response.message = "All Users are failed to retrive";
        response.success = false;
        response.error = result.error;
        response.data = result.data;
      }
      // response = result;
      res.status(200);
    } else {
      response.data = null;
      response.message = "Unauthorized User Access";
      response.error = "Error in /get-all-users";
      response.success = false;
    }
	} catch (err) {
    // console.log(err);
    console.log("Exception error in UserRouter /get-all-users. ", err);
    response.message = "Exception error in /get-all-users";
    response.error = error;
    response.success = false;
  }
  
  res.send(response);
});

// not used in angular
router.post('/get-verified-users', async (req, res, next) => {
  let response = {};
  const adminId = req.user_id || req.headers.user_id;
  const adminType = req.user_type || req.headers.user_type;
  if(_.isNil(adminId)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }

	try{
    if(adminType >= USER_TYPE.REVIEWER) {

      const result = await userService.findUsersByType({"is_verified": true});
      if(result.success && _.isNil(result.error)) {
        response.message = "All Users are retrived";
        response.success = true;
        response.error = null;
        response.data = result.data;
      } else {
        response.message = "All Users are failed to retrive";
        response.success = false;
        response.error = result.error;
        response.data = result.data;
      }
      // response = result;
      res.status(200);
    } else {
      response.data = null;
      response.message = "Unauthorized User Access";
      response.error = "Error in /get-verified-users";
      response.success = false;
    }
	} catch (err) {
    // console.log(err);
    console.log("Exception error in UserRouter /get-verified-users. ", err);
    response.message = "Exception error in /get-verified-users";
    response.error = error;
    response.success = false;
  }
  
  res.send(response);
});
// not used in angular
router.post('/get-not-verified-users', async (req, res, next) => {
  let response = {};
  const adminId = req.user_id || req.headers.user_id;
  const adminType = req.user_type || req.headers.user_type;
  if(_.isNil(adminId)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }

	try{
    if(adminType >= USER_TYPE.REVIEWER) {

      const result = await userService.findUsersByType({"is_verified": false});
      if(result.success && _.isNil(result.error)) {
        response.message = "All Users are retrived";
        response.success = true;
        response.error = null;
        response.data = result.data;
      } else {
        response.message = "All Users are failed to retrive";
        response.success = false;
        response.error = result.error;
        response.data = result.data;
      }
      // response = result;
      res.status(200);
    } else {
      response.data = null;
      response.message = "Unauthorized User Access";
      response.error = "Error in /get-verified-users";
      response.success = false;
    }
	} catch (err) {
    // console.log(err);
    console.log("Exception error in UserRouter /get-verified-users. ", err);
    response.message = "Exception error in /get-verified-users";
    response.error = error;
    response.success = false;
  }
  
  res.send(response);
});


module.exports = router;
