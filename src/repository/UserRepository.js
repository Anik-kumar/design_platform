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
      loggerService.getDefaultLogger().error('[UserRepository]-ERROR: Exception at getUser(): ' + JSON.stringify(ex));
      success = false;
    }

    return {
      data: result,
      success: success
    }
  }


  static async createUser(email, pass, firstName, lastName, phone, gender, dob) {
    let result = {}, success = true;
    try {
      let userObj = {
        "email": email,
        "pass": pass,
        "name": {
          "first": firstName,
          "last": lastName
        },
        "phone": phone,
        "gender": gender,
        "DOB": dob,
        "is_verified" : false,
        "is_deleted" : false,
        "date_created" : new Date(),
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
};
