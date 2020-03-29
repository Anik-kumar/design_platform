var Users = require('../models/mongo/users');
var _ = require('lodash');
var loggerService = require('../services/LoggingService');

module.exports = class UserRepository {
    constructor() {

    }

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

    static async createUser(subscription, email, pass, firstName, lastName) {
        let result = {}, success = true;
        try {
            let userObj = {
                "subscription": subscription,
                "email": email,
                "pass": pass,
                "name": {
                    "first": firstName,
                    "last": lastName
                },
                "verified" : true,
                "isDeleted" : false,
                "dateCreated" : new Date(),
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
