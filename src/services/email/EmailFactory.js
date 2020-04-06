
let sendGridService = require('./SendGridService');
let sendinBlueService = require('./SendinBlueService');
module.exports = class EmailFactory {
    constructor(){

    }
    static getEmailSenderService(service) { 
        let emailSender = sendGridService;
        switch(service) {
            case 'SENDGRID1':
            case 'SENDGRID2':
                emailSender = sendGridService;
                break;
            case 'SENDINBLUE1':
            case 'SENDINBLUE2':
                emailSender = sendinBlueService;
                break;
        }
        
        return emailSender;
    }
    static async getEmailCount() {

    }
};
