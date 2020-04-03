const emailFactory = require('./EmailFactory');
const emailCountService = require('./EmailCountService');
const emailConfigService = require('./EmailConfigService');

module.exports = class EmailService {

    constructor(){

    }

    static async sendEmail() {

        // select a mail service
        
        return new Promise((resolve, reject) => {
            try {
                const service = emailFactory.getEmailSenderService();
                service.s
                resolve('Success');
            } catch (ex) {
                loggingService.getDefaultLogger().error('[EmailService]-ERROR: Exception at sendEmail(): ' + JSON.stringify(ex));
                reject(ex);
            }

        });
    }



};
