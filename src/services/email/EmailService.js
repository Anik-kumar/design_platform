const emailFactory = require('./EmailFactory');
const emailCountService = require('./EmailCountService');
const emailConfigService = require('./EmailConfigService');
const {isNil, isEmpty, sortBy} = require('lodash');

module.exports = class EmailService {

    constructor(){

    }

    /**
     * 
     * @param {string} sernderService - Email sending service
     * @param {string} to - Email address
     * @param {string} name - Sender Name
     * @param {string} subject - Subject of the Email
     * @param {string} content - Email content
     */
    static async sendEmail(sernderService, to, name, subject, content) {

        // select a mail service
        let response={
            "error": true,
            "message": "Unfortunately email can't be sent at this moment."
        }, apiKey = null;
        let senderConfig = await emailConfigService.getConfig(sernderService);
        if (senderConfig.success == true && !isNil(senderConfig.data) && !isEmpty(senderConfig.data)) {
            apiKey = senderConfig.data['api_key'] || null;
        }

        try {
            if (!isNil(apiKey)) {
                let service = emailFactory.getEmailSenderService(sernderService);
                let isText = false;
                response = await service.sendEmail(apiKey, to, 'itadmin@etlimited.net', subject, content, isText, name);
                console.log('Service: '+sernderService+' | apiKey: '+apiKey);
                await emailCountService.updateEmailCountByService(sernderService);
            }
        } catch (ex) {
            loggingService.getDefaultLogger().error('[EmailService]-ERROR: Exception at sendEmail(): ' + (ex.message || ''));
        }
        
        return response;
    }

    static async prepareToSendEmail(to, subject, content, name) {
        let response = {
            "error": true,
            "message": "Unfortunately email can't be sent at this moment."
        };
        try {
            
            let emailsToday = await emailCountService.getTodaysEmailCount();
            if (emailsToday != null && emailsToday.success == true) {
                if (emailsToday.data.length > 0) {
                    let sender = '', apiKey = '';
                    
                    let orderedService = sortBy(emailsToday.data, ['priority']);
                    for(let service of orderedService) {
                        if (service['total_sent'] < service['daily_limit']) {
                            sender = service['service_name'];
                            break;
                        }
                    }
                    sender = 'SENDGRID2';
                    response = await EmailService.sendEmail(sender, to, name, subject, content);
                } else {
                    let result = await emailConfigService.getAllConfig();
                    if (result.success == true && result.data != null && result.data.length > 0) {
                        let d = new Date();
                        let today = d.getDate().toString().padStart(2, '0') + '-' + (d.getMonth() + 1).toString().padStart(2, '0') + '-' + d.getFullYear().toString();
                        let todaysCount = [];
                        let serviceMailCount = new Map();
                        result.data.forEach(config => {
                            todaysCount.push({
                                "date" : today,
                                "service_name" : config['service_name'],
                                "total_sent" : 0,
                                "daily_limit" : config['daily_limit'],
                                "monthly_limit" : config['monthly_limit'],
                                "priority" : config['priority'],
                                "updatedAt" : new Date()
                            });
                            serviceMailCount.set(config['service_name'], {
                                "sent": 0,
                                "daily_limit": config['daily_limit'],
                                "monthly_limit": config['monthly_limit']
                            });
                        });
                        if (todaysCount.length>0) {
                            let result = await emailCountService.insertMany(todaysCount);
                            if (result.success) {
                                let sender = '';
                                // order by priority first
                                let ordered = sortBy(todaysCount, ['priority']);
                                for(let service of ordered) {
                                    if (service['total_sent'] < service['daily_limit']) {
                                        sender = service['service_name'];
                                        break;
                                    }
                                }
                                response = await EmailService.sendEmail(sender, to, name, subject, content);
                            }
                        }
                    }
                }
            }
        } catch(ex) {
            loggingService.getDefaultLogger().error('[EmailService]-ERROR: Exception at prepareToSendEmail(): ' + (ex.message || ''));
        }
        return response;
    }



};
