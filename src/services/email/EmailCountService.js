const emailCountRepository = require('../../repository/EmailCountRepository');
const loggerService = require('../../services/LoggingService');


module.exports = class EmailCountService {
    constructor() {

    }

    /**
     *
     * @return {Promise<{data: *, success: *}>}
     */
    static async getAll() {
        let result = {}, success = true;
        try {
            let counts = await emailCountRepository.getAll();
            if (counts.success) {
                result = counts.data;
            }
            console.log('result: ', result);
        } catch (ex) {
            loggerService.getDefaultLogger().error('[EmailCountService]-ERROR: Exception at getAll(): ' + JSON.stringify(ex));
            success = false;
        }

        return {
            data: result,
            success: success
        }
    }
    static async getTodaysEmailCount() {
        let result = {}, success = true;
        try {
            let d = new Date();
            let today = d.getDate().toString().padStart(2, '0') + '-' + (d.getMonth() + 1).toString().padStart(2, '0') + '-' + d.getFullYear().toString();
            let counts = await emailCountRepository.getByDate(today);
            if (counts.success) {
                result = counts.data;
            }
        } catch (ex) {
            loggerService.getDefaultLogger().error('[EmailConfigService]-ERROR: Exception at getConfig(): ' + JSON.stringify(ex));
            success = false;
        }

        return {
            data: result,
            success: success
        }
    }

    static async getTodaysEmailCountByService(service_name) {
        let result = {}, success = true;
        try {
            let d = new Date();
            let today = d.getDate().toString().padStart(2, '0') + '-' + (d.getMonth() + 1).toString().padStart(2, '0') + '-' + d.getFullYear().toString();
            let counts = await emailCountRepository.getByServiceNameAndDate(today, service_name);
            if (counts.success) {
                result = counts.data;
            }
        } catch (ex) {
            loggerService.getDefaultLogger().error('[EmailConfigService]-ERROR: Exception at getConfig(): ' + JSON.stringify(ex));
            success = false;
        }

        return {
            data: result,
            success: success
        }
    }

    static async getTodaysEmailCountByService(service_name) {
        let result = {}, success = true;
        try {
            result = await emailServiceConfigRepository.getByService(service_name);
            console.log('result: ', result);
        } catch (ex) {
            loggerService.getDefaultLogger().error('[EmailConfigService]-ERROR: Exception at getConfig(): ' + JSON.stringify(ex));
            success = false;
        }

        return {
            data: result,
            success: success
        }
    }

    static async updateEmailCountByService(service_name) {
        let result = {}, success = true;
        try {
            let d = new Date();
            let today = d.getDate().toString().padStart(2, '0') + '-' + (d.getMonth() + 1).toString().padStart(2, '0') + '-' + d.getFullYear().toString();
            let counts = await emailCountRepository.getByServiceNameAndDate(today, service_name);
            if (counts.success) {
                let new_count = counts.data[0]['total_sent'] + 1;
                result = await emailCountRepository.updateTotalSentCount(today, service_name, new_count);
                console.log('result: ', result);
            }
        } catch (ex) {
            loggerService.getDefaultLogger().error('[EmailConfigService]-ERROR: Exception at getConfig(): ' + JSON.stringify(ex));
            success = false;
        }

        return {
            data: result,
            success: success
        }
    }
};
