var EmailCounts = require('../models/mongo/emailCount');
var _ = require('lodash');
var loggerService = require('../services/LoggingService');

module.exports = class EmailCountRepository {
    constructor() {

    }

    static async getAll() {
        let result = {}, success = true;
        try {
            result = await EmailCounts.find({}).exec();
        } catch (ex) {
            loggerService.getDefaultLogger().error('[EmailCountRepository]-ERROR: Exception at getAll(): ' + JSON.stringify(ex));
            success = false;
        }

        return {
            data: result,
            success: success
        }
    }

    /**
     *
     * @param date
     * @param service_name
     * @return {Promise<{data: *, success: *}>}
     */
    static async getByServiceNameAndDate(date, service_name) {
        let result = {}, success = true;
        try {
            result = await EmailCounts.find({
                "date": date,
                "service_name": service_name
            }).exec();
        } catch (ex) {
            loggerService.getDefaultLogger().error('[EmailCountRepository]-ERROR: Exception at getByServiceNameAndDate(): ' + JSON.stringify(ex));
            success = false;
        }

        return {
            data: result,
            success: success
        }
    }

    /**
     *
     * @param date
     * @return {Promise<{data: *, success: *}>}
     */
    static async getByDate(date) {
        let result = {}, success = true;
        try {
            result = await EmailCounts.find({
                "date": date
            }).exec();
        } catch (ex) {
            loggerService.getDefaultLogger().error('[EmailCountRepository]-ERROR: Exception at getByDate(): ' + JSON.stringify(ex));
            success = false;
        }

        return {
            data: result,
            success: success
        }
    }


    /**
     *
     * @param service_name
     * @return {Promise<{data: *, success: *}>}
     */
    static async getByService(service_name) {
        let result = {}, success = true;
        try {
            result = await EmailCounts.find({
                "service_name": service_name
            }).exec();
        } catch (ex) {
            loggerService.getDefaultLogger().error('[EmailCountRepository]-ERROR: Exception at getByService(): ' + JSON.stringify(ex));
            success = false;
        }

        return {
            data: result,
            success: success
        }
    }




    /**
     *
     * @param date
     * @param service_name
     * @param total_sent
     * @return {Promise<{data: *, success: *}>}
     */
    static async updateTotalSentCount(date, service_name, total_sent) {
        let result = {}, success = true;
        try {
            result = await EmailCounts.updateOne({
                "date": date,
                "service_name": service_name
            }, {
                $set: {
                    total_sent:  total_sent,
                    updatedAt: (new Date().toISOString())
                }
            }).exec();
        } catch (ex) {
            loggerService.getDefaultLogger().error('[EmailCountRepository]-ERROR: Exception at updateTotalSentCount(): ' + JSON.stringify(ex));
            console.log(ex);
            success = false;
        }

        return {
            data: result,
            success: success
        }
    }
};
