'use strict'

const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const _ = require('lodash');

const loggerService = require('../services/LoggingService');
const userService = require('../services/UserService');
const designService = require('../services/DesignService');
const activityService = require('../services/ActivityService');
const communicationService = require('../services/CommunicationService');
let {ResUserModel} = require('../models/response/response.models');
const { USER_TYPE, USER_TYPE_TEXT, getUserTypeTextByEnum } = require('../models/user_type.enum');


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

router.get('/public-designs', async (req, res, next) => {
  let response = {};
  const userId = req.user_id || req.headers.user_id;
  const userType = req.user_type || req.headers.user_type;
  const recentSql = "'raw_design.reviewed_by.date': -1";

  console.log("public-designs => ", userId);
  // console.log("get-approved => ", req.user_id);
  if(_.isNil(userId)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }
  try{
    // const userObj = await userService.findUserById(userId);
    if( userType >= USER_TYPE.DESIGNER) {
      const result = await designService.findAllPublicDesigns();
      console.log('Get Design Result', result);
      if(result.success && _.isNil(result.error)) {
        response.data = result.data;
        response.message = "User public designs are retrived";
        response.error = null;
        response.success = true;
      }else {
        response.data = result.data;
        response.message = "User public designs are NOT retrived";
        response.error = "Error in /design/public-designs";
        response.success = false;
      }
    } else {
      response.data = null;
      response.message = "Unauthorized User Access";
      response.error = "Error in /design/public-designs";
      response.success = false;
    }
    res.status(200);
  } catch(error) {
    console.log("Exception error in UserRouter /design/public-designs. ", error);
    response.message = "Exception error in /design/public-designs";
    response.error = error;
    response.success = false;
  }

  return res.send(response);

});

router.post('/admin/make-comment', async (req, res, next) => {
  let response = {};
  const adminId = req.user_id || req.headers.user_id;
  const adminType = req.user_type || req.headers.user_type;
  
  console.log("make-comment => ", adminId);
  if(_.isNil(adminId)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }
  try{
    
    if(adminType >= USER_TYPE.REVIEWER) {
      const result = await communicationService.create(req.body);
      
      console.log('Make comment result', result);
      if(result.success && _.isNil(result.error)) {
        response.data = result.data;
        response.message = "Make Comment action is Successful";
        response.error = null;
        response.success = true;
        let type = getUserTypeTextByEnum(adminType);
        await activityService.addActivityLlog(adminId, `${type} (${adminId}) commented on Design (${req.body.design_id}) at  ${new Date().toISOString()}`, []);
      }else {
        response.data = result.data;
        response.message = "Make Comment action is not Successful";
        response.error = "Error in /makeComment";
        response.success = false;
      }
    }else {
      return res.status(401).send({
        message: "Unauthorized Access"
      });
    }

    res.status(200);
  } catch(error) {
    console.log("Exception error in DesignRouter /make-comment. ", error);
    response.message = "Exception error in /make-comment";
    response.error = error;
    response.success = false;
  }

  return res.send(response);
});

router.post('/get-comments', async(req, res, next) => {
  let response = {};
  const userId = req.user_id || req.headers.user_id;
  const userType = req.user_type || req.headers.user_type;
  const contextId = req.body.context_id;

  console.log("get-comments => ", userId);
  console.log("get-comments => ", contextId);
  if(_.isNil(userId)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }
  try{
    // const userObj = await userService.findUserById(userId);

    const result = await communicationService.getCommentsByUser(contextId);
    console.log('Get Design Result', result);
    if(result.success && _.isNil(result.error)) {
      response.data = result.data;
      response.message = "User public designs are retrived";
      response.error = null;
      response.success = true;
    }else {
      response.data = result.data;
      response.message = "User public designs are NOT retrived";
      response.error = "Error in /design/public-designs";
      response.success = false;
    }
    res.status(200);
  } catch(error) {
    console.log("Exception error in UserRouter /design/public-designs. ", error);
    response.message = "Exception error in /design/public-designs";
    response.error = error;
    response.success = false;
  }

  return res.send(response);
});


module.exports = router;
