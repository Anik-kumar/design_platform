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
  const userId = req.user_id | req.headers.user_id;
  let response = {};
  console.log("/details/:title => ", userId);
  console.log("/details/:title ", title);
  if(_.isNil(userId)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }

  try {
    const result = await designService.findOne({"user_unique_id": userId, "title_path": title});
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
  const userId = req.user_id | req.headers.user_id;
  console.log("/edit/:title => ", userId);
  console.log("/edit/:title ", title);
  if(_.isNil(userId)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }

  try {
    const result = await designService.findOne({"user_unique_id": userId, "title_path": title});
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


router.get('/admin/get-all', async (req, res, next) => {
  let response = {};
  const userId = req.user_id || req.headers.user_id;
  console.log("getdesigns => ", userId);
  console.log("getdesigns => ", req.user_id);
  if(_.isNil(userId)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }
  try{
    const userObj = await userService.findUserById(userId);
    if(userObj.result.user_type.toLowerCase() === "admin" || userObj.result.user_type.toLowerCase() === "reviewer") {
      const result = await designService.findAllInDB();
      console.log('Get Design Result', result);
      if(result.success && _.isNil(result.error)) {
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
    }
    res.status(200);
  } catch(error) {
    console.log("Exception error in UserRouter /get-all-unrestrict. ", error);
    response.message = "Exception error in /get-all-unrestrict";
    response.error = error;
    response.success = false;
  }

  return res.send(response);

});

router.get('/admin/get-submitted', async (req, res, next) => {
  let response = {};
  const adminId = req.user_id || req.headers.user_id;
  console.log("getdesigns => ", adminId);
  console.log("getdesigns => ", req.user_id);
  if(_.isNil(adminId)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }
  try{
    const userObj = await userService.findUserById(adminId);
    if(userObj.result.user_type.toLowerCase() === "admin" || userObj.result.user_type.toLowerCase() === "reviewer") {
      const result = await designService.findDesignsAdminSubmitted(adminId);
      console.log('Get Design Result', result);
      if(result.success && _.isNil(result.error)) {
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
    }
    res.status(200);
  } catch(error) {
    console.log("Exception error in UserRouter /admin/get-submitted. ", error);
    response.message = "Exception error in /admin/get-submitted";
    response.error = error;
    response.success = false;
  }

  return res.send(response);

});

router.get('/admin/get-approved', async (req, res, next) => {
  let response = {};
  const userId = req.user_id || req.headers.user_id;
  console.log("get-approved => ", userId);
  console.log("get-approved => ", req.user_id);
  if(_.isNil(userId)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }
  try{
    const userObj = await userService.findUserById(userId);
    if(userObj.result.user_type.toLowerCase() === "admin" || userObj.result.user_type.toLowerCase() === "reviewer") {
      const result = await designService.findAdminApproved(userId);
      console.log('Get Design Result', result);
      if(result.success && _.isNil(result.error)) {
        response.data = result.data;
        response.message = "User designs is retrived";
        response.error = null;
        response.success = true;
      }else {
        response.data = result.data;
        response.message = "User designs is NOT retrived";
        response.error = "Error in /get-approved";
        response.success = false;
      }
    }
    res.status(200);
  } catch(error) {
    console.log("Exception error in UserRouter /admin/get-approved. ", error);
    response.message = "Exception error in /admin/get-approved";
    response.error = error;
    response.success = false;
  }

  return res.send(response);

});

router.get('/admin/get-rejected', async (req, res, next) => {
  let response = {};
  const userId = req.user_id || req.headers.user_id;
  console.log("get-rejected => ", userId);
  console.log("get-rejected => ", req.user_id);
  if(_.isNil(userId)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }
  try{
    const userObj = await userService.findUserById(userId);
    if(userObj.result.user_type.toLowerCase() === "admin" || userObj.result.user_type.toLowerCase() === "reviewer") {
      const result = await designService.findAdminRejected(userId);
      console.log('Get Design Result', result);
      if(result.success && _.isNil(result.error)) {
        response.data = result.data;
        response.message = "User designs is retrived";
        response.error = null;
        response.success = true;
      }else {
        response.data = result.data;
        response.message = "User designs is NOT retrived";
        response.error = "Error in /get-rejected";
        response.success = false;
      }
    }
    res.status(200);
  } catch(error) {
    console.log("Exception error in UserRouter /admin/get-rejected. ", error);
    response.message = "Exception error in /admin/get-rejected";
    response.error = error;
    response.success = false;
  }

  return res.send(response);

});

router.get('/admin/get-reviewing', async (req, res, next) => {
  let response = {};
  const userId = req.user_id || req.headers.user_id;
  console.log("get-reviewing => ", userId);
  console.log("get-reviewing => ", req.user_id);
  if(_.isNil(userId)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }
  try{
    const userObj = await userService.findUserById(userId);
    if(userObj.result.user_type.toLowerCase() === "admin" || userObj.result.user_type.toLowerCase() === "reviewer") {
      const result = await designService.findAdminReviewing(userId);
      console.log('Get Design Result', result);
      if(result.success && _.isNil(result.error)) {
        response.data = result.data;
        response.message = "User designs is retrived";
        response.error = null;
        response.success = true;
      }else {
        response.data = result.data;
        response.message = "User designs is NOT retrived";
        response.error = "Error in /get-reviewing";
        response.success = false;
      }
    }
    res.status(200);
  } catch(error) {
    console.log("Exception error in UserRouter /admin/get-reviewing. ", error);
    response.message = "Exception error in /admin/get-reviewing";
    response.error = error;
    response.success = false;
  }

  return res.send(response);

});

router.post('/admin/get-all-by-admin-state', async (req, res, next) => {
  let response = {};
  const searcheState = req.body.state;
  const adminId = req.user_id || req.headers.user_id;
  console.log("get-all-by-admin-state => ", adminId);
  console.log("get-all-by-admin-state => ", searcheState);
  if(_.isNil(adminId)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }
  try{
    const userObj = await userService.findUserById(adminId);
    if(userObj.result.user_type.toLowerCase() === "admin" || userObj.result.user_type.toLowerCase() === "reviewer") {
      const result = await designService.findDesignsByStateAndId(adminId,searcheState);
      // console.log('Get Design Result', result);
      if(result.success && _.isNil(result.error)) {
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
    }else {
      return res.status(401).send({
        message: "Unauthorized Access"
      });
    }
    res.status(200);
  } catch(error) {
    console.log("Exception error in UserRouter /get-all-by-admin-state. ", error);
    response.message = "Exception error in /get-all-by-admin-state";
    response.error = error;
    response.success = false;
  }

  return res.send(response);

});

router.post('/admin/get-all-by-state', async (req, res, next) => {
  let response = {};
  const searcheState = req.body.state;
  const adminId = req.user_id || req.headers.user_id;
  console.log("get-all-state => ", adminId);
  console.log("get-all-state => ", searcheState);
  if(_.isNil(adminId)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }
  try{
    const userObj = await userService.findUserById(adminId);
    if(userObj.result.user_type.toLowerCase() === "admin" || userObj.result.user_type.toLowerCase() === "reviewer") {
      const result = await designService.findDesignsByState(searcheState);
      // console.log('Get Design Result', result);
      if(result.success && _.isNil(result.error)) {
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
    }else {
      return res.status(401).send({
        message: "Unauthorized Access"
      });
    }
    res.status(200);
  } catch(error) {
    console.log("Exception error in UserRouter /get-all-state. ", error);
    response.message = "Exception error in /get-all-state";
    response.error = error;
    response.success = false;
  }

  return res.send(response);

});


router.post('/state/review/:designid', async (req, res, next) => {
  const designId = req.params.designid;
  const designOwnerId = req.body.designOwnerId;
  const userId = req.user_id || req.headers.user_id;
  let response = {};
  // console.log("/review/:designId => ", userId);
  // console.log("/review/:designId -> ", designOwnerId);
  // console.log("/review/:designId > ", designId);
  if(_.isNil(userId)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }

  try {
    let filterObj = {
      "design_id": designId, 
      "user_unique_id": designOwnerId
    };
    let updateObj = {
      'whereami.current_state': 'reviewing', 
      'whereami.previous_state': 'submitted',
      'raw_design.reviewer': userId
    };
    const userObj = await userService.findUserById(userId);
    if(userObj.result.user_type.toLowerCase() !== "customer" || userObj.result.user_type.toLowerCase() !== "designer") {
      const result = await designService.updateOne(filterObj, updateObj);
      console.log('Get Design Result', result);
      if(result.success && _.isNil(result.error)) {
        response.data = result.data;
        response.message = "User design state is changed to 'reviewing'";
        response.error = null;
        response.success = true;
      }else {
        response.data = result.data;
        response.message = "User design state is failed to change";
        response.error = "Error in designReviewState";
        response.success = false;
      }
    }
    res.status(200);
  } catch(error) {
    console.log("Exception error in UserRouter /review/:designId. ", error);
    response.message = "Exception error in /review/:designId ";
    response.error = error;
    response.success = false;
  }

  return res.send(response);
});

router.post('/state/submit/:designid', async (req, res, next) => {
  const designId = req.params.designid;
  const userId = req.user_id || req.headers.user_id;
  let response = {};
  console.log("/state/submit/:title => ", userId);
  console.log("/state/submit/:title ", designId);
  if(_.isNil(userId)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }

  try {
    let filterObj = {
      "design_id": designId
    };
    let updateObj = {
      'whereami.current_state': 'submitted', 
      'whereami.previous_state': ''
    };
    const userObj = await userService.findUserById(userId);
    if(userObj.result.user_type.toLowerCase() !== "customer" || userObj.result.user_type.toLowerCase() !== "designer") {

      const result = await designService.updateOne(filterObj, updateObj);
      console.log('Get Design Result', result);
      if(result.success && _.isNil(result.error)) {
        response.data = result.data;
        response.message = "User design state is changed to 'submitted'";
        response.error = null;
        response.success = true;
      }else {
        response.data = result.data;
        response.message = "User design state is failed to change";
        response.error = "Error in designReviewState";
        response.success = false;
      }
    }
    res.status(200);
  } catch(error) {
    console.log("Exception error in UserRouter /state/submit/:title. ", error);
    response.message = "Exception error in /state/submit/:title ";
    response.error = error;
    response.success = false;
  }

  return res.send(response);
});

router.post('/state/approve/:designid', async (req, res, next) => {
  const designId = req.params.designid;
  const userId = req.user_id || req.headers.user_id;
  let response = {};
  let today = new Date().toISOString();
  console.log("/state/approve/:designid => ", userId);
  console.log("/state/approve/:designid => ", designId);
  if(_.isNil(userId)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }

  try {
    let filterObj = {
      "design_id": designId
    };
    let updateObj = {
      'whereami.current_state': 'submitted', 
      'whereami.previous_state': '',
      "raw_design.approved_by.user": userId,
      "raw_design.approved_by.date": today
    };
    const result = await designService.updateOne(filterObj, updateObj);
    console.log('Get Design Result', result);
    if(result.success && _.isNil(result.error)) {
      response.data = result.data;
      response.message = "User design state is changed to 'submitted'";
      response.error = null;
      response.success = true;
    }else {
      response.data = result.data;
      response.message = "User design state is failed to change";
      response.error = "Error in designReviewState";
      response.success = false;
    }
    res.status(200);
  } catch(error) {
    console.log("Exception error in UserRouter /state/approve/:designid. ", error);
    response.message = "Exception error in /state/approve/:designid ";
    response.error = error;
    response.success = false;
  }

  return res.send(response);
});

router.post('/state/reject/:designid', async (req, res, next) => {
  const designId = req.params.designid;
  const userId = req.user_id || req.headers.user_id;
  let response = {};
  let today = new Date().toISOString();
  console.log("/state/reject/:designid => ", userId);
  console.log("/state/reject/:designid => ", designId);
  // if(_.isNil(userId)) {
  //   return res.status(401).send({
  //     message: "Unauthorized Access"
  //   });
  // }

  try {
    let filterObj = {
      "design_id": designId
    };
    let updateObj = {
      'whereami.current_state': 'rejected', 
      'whereami.previous_state': 'reviewing',
      "raw_design.rejected_by.user": userId,
      "raw_design.rejected_by.date": today
    };
    const result = await designService.updateOne(filterObj, updateObj);
    console.log('Get Design Result', result);
    if(result.success && _.isNil(result.error)) {
      response.data = result.data;
      response.message = "User design state is changed to 'submitted'";
      response.error = null;
      response.success = true;
    }else {
      response.data = result.data;
      response.message = "User design state is failed to change";
      response.error = "Error in designReviewState";
      response.success = false;
    }
    res.status(200);
  } catch(error) {
    console.log("Exception error in UserRouter /state/submit/:designid. ", error);
    response.message = "Exception error in /state/submit/:designid ";
    response.error = error;
    response.success = false;
  }

  return res.send(response);
});


module.exports = router;
