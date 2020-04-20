const session = require('express-session');
const ConfigLoader = require('../config/ConfigLoader');
const _ = require('lodash');
const accessControlRepository = require('../repository/AccessControlRepository');
const navigations = require('../models/navigations');

module.exports = class AuthorizationService {
    constructor() {
        this.sessionStore = new session.MemoryStore();
    }

    static async getRoutes(user_unique_id) {
        let data = {}, success = true;
        try {
            let result = await accessControlRepository.getUIRoutesByUser(user_unique_id);
            if (result.success) {
                data = result.data;
            }
        } catch (ex) {
            loggerService.getDefaultLogger().error('[AuthorizationService]-ERROR: Exception at getRoutes(): ' + (ex.message || ''));
            success = false;
        }
        return {
            data: data,
            success: success
        }
    }

    static async addRoutes(user_unique_id, accessible_route) {
        let data = {}, success = true;
        try {
            let result = await accessControlRepository.addUIRouteToUser(user_unique_id, accessible_route);
            if (result.success) {
                data = result.data;
            }
        } catch (ex) {
            loggerService.getDefaultLogger().error('[AuthorizationService]-ERROR: Exception at addRoutes(): ' + (ex.message || ''));
            success = false;
        }
        return {
            data: data,
            success: success
        }
    }

    static async insert() {
        let data = {}, success = true;
        try {
            let result = await accessControlRepository.upsert(user_unique_id, access_controls);
            if (result.success) {
                data = result.data;
            }
        } catch (ex) {
            loggerService.getDefaultLogger().error('[AuthorizationService]-ERROR: Exception at insert(): ' + (ex.message || ''));
            success = false;
        }
        return {
            data: data,
            success: success
        }
    }

    static async getNavigations() {
        // read from database by user type
        let data = {}, success = true;
        return new Promise ((resolve, reject) => {
            try {
                resolve({data: navigations, success: true});
            }
            catch(ex) {
                loggerService.getDefaultLogger().error('[AuthorizationService]-ERROR: Exception at getNavigations(): ' + (ex.message || ''));
                success = false;
                reject();
            }
        });
    }
};
