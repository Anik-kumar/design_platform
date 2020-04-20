var AccessControls = require('../models/mongo/accessControl');
var _ = require('lodash');
var loggerService = require('../services/LoggingService');

module.exports = class AccessControlRepository {
    constructor() {

    }

    /**
     * Function to get user accessible routes in access_control collection
     * @param {String} user_unique_id - User unique id
     * @return {Promise<{data: *, success: *}>}
     */
    static async getUIRoutesByUser(user_unique_id) {
        let result = {}, success = true;
        try {
            // result = await AccessControls.find({
            //     "user_unique_id": user_unique_id
            // }).exec();
            result = await AccessControls.find({
                "user_unique_id": user_unique_id
            }).select({'ui_routes': 1}).exec();
        } catch (ex) {
            loggerService.getDefaultLogger().error('[AccessControlRepository]-ERROR: Exception at getUIRoutesByUser(): ' + (ex.message || ''));
            success = false;
        }

        return {
            data: result,
            success: success
        }
    }

    /**
     * Function to find and update user accessible route by pushing new route in access_control collection
     * @param {String} user_unique_id - User unique id
     * @param {object} accessible_route - User accessible route
     * @return {Promise<{data: *, success: *}>}
     */
    static async addUIRouteToUser(user_unique_id, accessible_route) {
        let result = {}, success = true;
        try {
            result = await AccessControls.findOneAndUpdate({
                "user_unique_id": user_unique_id
            }, {
                $push: {'ui_routes': accessible_route}
            }, {'upsert': true}).exec();
        } catch (ex) {
            loggerService.getDefaultLogger().error('[AccessControlRepository]-ERROR: Exception at addUIRouteToUser(): ' + (ex.message || ''));
            success = false;
        }
        return {
            data: result,
            success: success
        }
    }

    static async upsert(user_unique_id, access_control) {
        let result = {}, success = true;
        try {
            result = await AccessControls.findOneAndUpdate({
                "user_unique_id": user_unique_id
            }, access_control, {'upsert': true}).exec();
        } catch (ex) {
            loggerService.getDefaultLogger().error('[AccessControlRepository]-ERROR: Exception at upsert(): ' + (ex.message || ''));
            success = false;
        }
        return {
            data: result,
            success: success
        }
    }


};
