'use strict'

const express = require('express');
const router = express.Router();
const _ = require('lodash');

const loggerService = require('../services/LoggingService');
const activityService = require('../services/ActivityService');

router.get('/mine/:offset/:limit', async (req, res, next) => {
    let response = {};
    console.log("user id => ", req.user_id);
    let offset = req.params['offset'] || 0;
    let limit = req.params['limit'] || 10;
    if(_.isNil(req.user_id)) {
      return res.status(401).send({
        message: "Unauthorized Access"
      });
    }
    try{
      const result = await activityService.getActivityLogByUser(req.user_id, offset, limit);
      console.log('Get activity result', result);
      if(result.success && _.isNil(result.error)) {
        response.data = result.data;
        response.message = "User activity is retrived";
        response.error = null;
        response.success = true;
      } else {
        response.data = result.data;
        response.message = "User activity is NOT retrived";
        response.error = "Error in getActivityLogByUser";
        response.success = false;
      }
      res.status(200);
    } catch(error) {
      console.log("Exception error in ActivityRouter /mine/:offset/:limit. ", error);
      loggerService.error({});
      response.message = "Exception error in /mine/:offset/:limit";
      response.error = error;
      response.success = false;
    }
  
    return res.send(response);  
});

router.get('/all/:offset/:limit', async (req, res, next) => {
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