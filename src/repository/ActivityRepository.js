var Activity = require('../models/mongo/activity');
var {isNil, isDate} = require('lodash');
var loggerService = require('../services/LoggingService');

module.exports = class ActivityRepository {

  constructor() { }

  /**
   * Function to get activity log by date
   * @param {*} date 
   */
  static async getActivityLogByDate(date) {
    let result = {}, success = true;
    try {
      if(isNil(date)) {
        return null;
      }
      if(!isDate(date)) {
        return null;
      }
      let date_str = date.getFullYear().toString() + '-' + date.getMonth().toString().padStart(2,'0') + '-' + date.getDate().toString().padStart(2,'0');
      result = await Activity.find({
        "ix_date": date_str
      }).exec();
    } catch (ex) {
      loggerService.error({message: '[ActivityRepository]-ERROR: Exception at getActivityLogByDate(): ', error: ex});
      success = false;
    }

    return {
      data: result,
      success: success
    }
  }

  /**
   * Function to get activity log by date range
   * @param {*} date 
   */
  static async getActivityLogByDateRange(startDate, enddate) {
    let result = {}, success = true;
    try {
      if(isNil(date)) {
        return null;
      }
      if(!isDate(date)) {
        return null;
      }
      result = await Activity.find({
        "ix_date": {
            $gte: startDate,
            $lt: enddate
        }
      }).exec();
    } catch (ex) {
      loggerService.error({message: '[ActivityRepository]-ERROR: Exception at getActivityLogByDateRange(): ', error: ex});
      success = false;
    }

    return {
      data: result,
      success: success
    }
  }


  /**
   * Function to get activity log by last hours
   * @param {*} date 
   */
  static async getActivityLogByLastNHours(hour) {
    let result = {}, success = true;
    try {
      if(isNil(hour)) {
        return null;
      }
      if(hour > 23 || hour < 0) {
        return null;
      }
      let d = new Date();
      let curHr = (new Date()).getHours()
      d.setHours(0);
      d.setMinutes(0);
      d.setSeconds(0);

      let hours = [];
      for(i=curHr; i>=curHr-hour; i--) {
        hours.push(i);    
      }
      result = await Activity.find({
        "ix_date": d,
        "ix_time": { $in: hours }
      }).exec();
    } catch (ex) {
      loggerService.error({message: '[ActivityRepository]-ERROR: Exception at getActivityLogByLastNHours(): ', error: ex});
      success = false;
    }

    return {
      data: result,
      success: success
    }
  }


  /**
   * Function to get activity log by last hours
   * @param {*} date 
   */
  /*static async getActivityLogByUser(user_id) {
    let result = {}, success = true;
    try {
      if(isNil(user_id)) {
        return null;
      }
      let eDate = new Date();
      let curHr = (new Date()).getHours()
      eDate.setHours(0);
      eDate.setMinutes(0);
      eDate.setSeconds(0);
      let sDate = new Date();
      sDate.setHours(0);
      sDate.setMinutes(0);
      sDate.setSeconds(0);
      sDate.setMonth(0); // this year only

      result = await Activity.find({
        "user_id": user_id,
        "ix_date": {
            $gte: sDate,
            $lte: eDate
        },
      }).exec();

      result = await Activity.aggregate([
          { 
            $match: { 
              "user_id": user_id,
              "ix_date": {
                $gte: sDate,
                $lte: eDate
              }
            }
        },
        { $sort: { date_created: -1 } },
        { $limit : 100 }
      ])
    } catch (ex) {
      loggerService.error({message: '[ActivityRepository]-ERROR: Exception at getActivityLogByUser(): ', error: ex});
      success = false;
    }

    return {
      data: result,
      success: success
    }
  }*/

  static async getActivityLogByUser(user_id, offset, limit) {
    let result = {}, success = true;
    console.log(`user id ${user_id}, offset ${offset} limit ${limit}`);
    try {
      if(isNil(user_id)) {
        return null;
      }
      if (isNil(offset)) {
        offset = 0;
      }
      if (isNil(limit)) {
        offset = 10;
      }
      let eDate = new Date();
      let curHr = (new Date()).getHours()
      eDate.setHours(0);
      eDate.setMinutes(0);
      eDate.setSeconds(0);
      let sDate = new Date();
      sDate.setHours(0);
      sDate.setMinutes(0);
      sDate.setSeconds(0);
      sDate.setMonth(0); // this year only

      // result = await Activity.find({
      //   "user_id": user_id,
      //   "ix_date": {
      //       $gte: sDate,
      //       $lte: eDate
      //   },
      // }).exec();
      console.log(`sDate: ${sDate.toISOString()} eDate: ${eDate.toISOString()}`);
      result = await Activity.aggregate([
          { 
            $match: { 
              "user_id": user_id,
              "ix_date": {
                $gte: sDate,
                $lte: eDate
              }
            }
        },
        { $sort: { date_created: -1 } },
        { $skip : offset },
        { $limit : limit }
      ]).exec();
    } catch (ex) {
      console.log(ex);
      loggerService.error({message: '[ActivityRepository]-ERROR: Exception at getActivityLogByUser(): ', error: ex});
      success = false;
    }

    return {
      data: result,
      success: success
    }
  }
  /**
   * Function to create new activity
   * @param {*} user_id 
   * @param {*} description 
   */
  static async create(user_id, description, more) {
    let result = {}, success = true;
    try {
      let ix_date = new Date(), cur_date = new Date();
      ix_date.setHours(0);
      ix_date.setMinutes(0);
      ix_date.setSeconds(0); 
      ix_date.setMilliseconds(0);
      let activityObj = {
        "user_id": user_id,
        "description": description,
        "more": more || [],
        "ix_date": ix_date,
        "ix_month": cur_date.getMonth(),
        "ix_time": cur_date.getHours(),
        "date_created": cur_date
      };
      result = await Activity.create(activityObj);
    } catch (ex) {
      loggerService.error({message: '[ActivityRepository]-ERROR: Exception at create(): ', error: ex});
      success = false;
    }

    return {
      data: result,
      success: success
    }
  }
}