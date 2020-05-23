'use strict'

const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const _ = require('lodash');

const loggerService = require('../services/LoggingService');
const userService = require('../services/UserService');
const designService = require('../services/DesignService');
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


router.post('/new', async function(req, res, next){
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


router.get('/get-all', async (req, res, next) => {
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


router.post('/find-one', async (req, res, next) => {
  let response = {};
  console.log("getdesigns => ", req.user_id);
  if(_.isNil(req.user_id)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }
  try{
    const result = await designService.findOne({"user_unique_id": req.user_id, "design_id": req.body.designId});
    console.log('Get Design Result', result);
    if(result.success && _.isNil(result.error)) {
      response.data = result.data;
      response.message = "User design is retrived";
      response.error = null;
      response.success = true;
    }else {
      response.data = result.data;
      response.message = "User design is NOT retrived";
      response.error = "Error in getDesignsRouter";
      response.success = false;
    }
    res.status(200);
  } catch(error) {
    console.log("Exception error in UserRouter /find-design. ", error);
    response.message = "Exception error in /find-design";
    response.error = error;
    response.success = false;
  }

  return res.send(response);

});


router.post('/update', async (req, res, next) => {
  console.log("updatedesign => ", req.user_id);
  console.log("updatedesign ", req.body);
  let result = [];

  if(_.isNil(req.user_id)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }

  try {
    const designInfo = {
      userId: req.user_id,
      designId: req.body.design_id,
      title: req.body.title,
      type: req.body.type,
      tags: req.body.tags,
      des: req.body.description
    }
  } catch(err) {

  }

  return;
});


router.get('/details/:title', async (req, res, next) => {
  const title = req.params.title;
  let response = {};
  console.log("/details/:title => ", req.user_id);
  console.log("/details/:title ", title);
  if(_.isNil(req.user_id)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }

  try {
    const result = await designService.findOne({"user_unique_id": req.user_id, "title_path": title});
    console.log('Get Design Result', result);
    if(result.success && _.isNil(result.error)) {
      response.data = result.data;
      response.message = "User design is retrived";
      response.error = null;
      response.success = true;
    }else {
      response.data = result.data;
      response.message = "User design is NOT retrived";
      response.error = "Error in getDesignsRouter";
      response.success = false;
    }
    res.status(200);
  } catch(error) {
    console.log("Exception error in UserRouter /details/:title. ", error);
    response.message = "Exception error in /details/:title ";
    response.error = error;
    response.success = false;
  }

  return res.send(response);
});


router.get('/edit/:title', async (req, res, next) => {
  const title = req.params.title;
  let response = {};
  console.log("/edit/:title => ", req.headers.user_id);
  console.log("/edit/:title ", title);
  // if(_.isNil(req.user_id)) {
  //   return res.status(401).send({
  //     message: "Unauthorized Access"
  //   });
  // }

  try {
    const result = await designService.findOne({"user_unique_id": req.headers.user_id, "title_path": title});
    console.log('Get Design Result', result);
    if(result.success && _.isNil(result.error)) {
      response.data = result.data;
      response.message = "User design is retrived";
      response.error = null;
      response.success = true;
    }else {
      response.data = result.data;
      response.message = "User design is NOT retrived";
      response.error = "Error in getDesignsRouter";
      response.success = false;
    }
    res.status(200);
  } catch(error) {
    console.log("Exception error in UserRouter /edit/:title. ", error);
    response.message = "Exception error in /edit/:title ";
    response.error = error;
    response.success = false;
  }

  return res.send(response);
});



module.exports = router;
