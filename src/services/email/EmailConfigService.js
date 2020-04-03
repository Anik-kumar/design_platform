const emailServiceConfigRepository = require('../../repository/EmailServiceConfigRepository');
const loggerService = require('../../services/LoggingService');


module.exports = class EmailConfigService {
    constructor() {

    }

    /**
     *
     * @return {Promise<{data: *, success: *}>}
     */
    static async getAllConfig() {
        let result = {}, success = true;
        try {
            let configs = await emailServiceConfigRepository.getAllConfig();
            if (configs.success) {
                result = configs.data;
            }
        } catch (ex) {
            loggerService.getDefaultLogger().error('[EmailConfigService]-ERROR: Exception at getAllConfig(): ' + JSON.stringify(ex.message));
            console.log(ex)
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
    static async getConfig(service_name) {
        let result = {}, success = true;
        try {
            result = await emailServiceConfigRepository.getConfig(service_name);
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
};
