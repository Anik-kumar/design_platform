var EmailServiceConfig = require('../models/mongo/emailServiceConfig');
var _ = require('lodash');
var loggerService = require('../services/LoggingService');

module.exports = class EmailServiceConfigRepository {
    constructor() {

    }

    static async getConfig(serviceName) {
        let result = {}, success = true;
        try {
            result = await EmailServiceConfig.find({
                "service_name": serviceName
            }).exec();
        } catch (ex) {
            loggerService.getDefaultLogger().error('[EmailServiceConfigRepository]-ERROR: Exception at getConfig(): ' + JSON.stringify(ex));
            success = false;
        }

        return {
            data: result,
            success: success
        }
    }

    static async getAllConfig() {
        let result = {}, success = true;
        try {
            result = await EmailServiceConfig.find({}).exec();
        } catch (ex) {
            loggerService.getDefaultLogger().error('[EmailServiceConfigRepository]-ERROR: Exception at getConfig(): ' + JSON.stringify(ex));
            success = false;
        }

        return {
            data: result,
            success: success
        }
    }
};
