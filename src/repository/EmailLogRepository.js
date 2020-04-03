var EmailLog = require('../models/mongo/emailLog');
var _ = require('lodash');
var loggerService = require('../services/LoggingService');

module.exports = class EmailLogRepository {
    constructor() {

    }


    static async getEmailSentTo(sentTo) {
        let result = {}, success = true;
        try {
            result = await EmailLog.find({
                "sentTo": sentTo
            }).exec();
        } catch (ex) {
            loggerService.getDefaultLogger().error('[EmailLogRepository]-ERROR: Exception at getEmailSentTo(): ' + JSON.stringify(ex));
            success = false;
        }

        return {
            data: result,
            success: success
        }
    }
};
