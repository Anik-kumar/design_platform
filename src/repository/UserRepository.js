var Users = require('../models/mongo/users');
var _ = require('lodash');
var loggerService = require('../services/LoggingService');

module.exports = class UserRepository {

  constructor() { }

  static async getUser(email, pass) {
    let result = {}, success = true;
    try {
      result = await Users.find({
        "email": email,
        "pass": pass
      }).exec();
    } catch (ex) {
      loggerService.error({message: '[UserRepository]-ERROR: Exception at getUser(): ', error: ex});
      success = false;
    }

    return {
      data: result,
      success: success
    }
  }


  static async getUserByEmail(email) {
    let result = {}, success = true;
    try {
      result = await Users.find({
        "email": email
      }).exec();
    } catch (ex) {
      loggerService.error({message: '[UserRepository]-ERROR: Exception at getUser(): ', error: ex});
      success = false;
    }

    return {
      data: result,
      success: success
    }
  }


  static async createUser(unique_id, email, pass, userType, firstName, lastName, phone, gender, dob) {
    let result = {}, success = true;
    try {
      let userObj = {
        "unique_id": unique_id,
        "email": email,
        "name": {
          "first": firstName,
          "last": lastName
        },
        "pass": pass,
        "user_type": userType,
        "phone": phone,
        "gender": gender,
        "DOB": dob,
        "is_verified" : false,
        "is_deleted" : false,
        "date_created" : new Date(),
        "verification": {
          "email": {
            "verified": false,
            "email_sent": true
          },
          "phone": {
            "verified": false,
            "code_sent": false,
            "codes": []
          },
          "is_reset_pass_active": false
        },
        "role": [],
        "avatar": null,
        "cover_photo": null,
        "reward_points": 0,
        "social_profiles": {
          "fb_url": null,
          "linkedin_url": null,
          "google_url": null,
        }
      };
      result = await Users.create(userObj);
    } catch (ex) {
      loggerService.getDefaultLogger().error('[UserRepository]-ERROR: Exception at createUser(): ' + JSON.stringify(ex));
      success = false;
    }

    return {
      data: result,
      success: success
    }
  }


  static async findOne(filter) {
    let success = true;
    let result = {};
    console.log("From UserRepository => ", filter);

    try{
      result = await Users.findOne(filter).exec();
    } catch(ex) {
      loggerService.error({message: '[UserRepository]-ERROR:  Exception at find(): ', error: ex});
      success = false;
    }


    return {
      success: success,
      result: result
    }
  }


  static async findAll(filter) {
    let success = true;
    let result;
    console.log("From UserRepository => ", filter);

    try{
      result = await Users.find(filter).exec();
      
    } catch(ex) {
      loggerService.error({message: '[UserRepository]-ERROR:  Exception at findAll(): ', error: ex});
      success = false;
    }


    return {
      success: success,
      result: result
    }
  }


  static async findUserByEmail(email) {
    let success = true;
    let result = {};

    try{
      result = await Users.findOne({
        "email" : email
      }).exec();
    } catch(ex) {
      loggerService.error({message: '[UserRepository]-ERROR: Exception at findUser(): ', error: ex});
      success = false;
    }


    return {
      success: success,
      result: result
    }
  }

  // static async updateUserVerification(email, arr) {
  //   let success = true;
  //   let result = {};

  //   try {
  //     result = await User.updateOne({
  //       "email": email
  //     }, { $set: {
  //       params: value
  //     }})
  //   }

  // }

  /**
   * Funtion to update single document in Users colletion
   *
   * @param {object} filter - find object
   * @param {object} updateObj - data
   * @returns {Promise<{success: boolean, result: UserModel }>}
   */
  static async updateOne(filter, updateObj) {
    let success = true;
    let result = {};

    try {
      result = await Users.updateOne(filter, { $set: updateObj});
    } catch(ex) {
      loggerService.error({message: '[UserRepository]-ERROR: Exception at update(): ', error: ex});
      success = false;

    }

    return {
      success: success,
      result: result
    }
  }





};
