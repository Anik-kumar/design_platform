
// using Twilio SendGrid's v3 Node.js Library

// https://github.com/sendgrid/sendgrid-nodejs
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//     to: 'test@example.com',
//     from: 'test@example.com',
//     subject: 'Sending with Twilio SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);

// SUBSCRIBER LIMIT MONTHLY SEND LIMIT  DAILY SEND LIMIT
// Unlimited	    3,000	            100
module.exports = class SendGridService {
    constructor(props) {

    }

    /**
     * Function to send email using SendGrid
     *
     * @param to
     * @param subject
     * @param content
     * @param isText
     * @param from
     * @return {Promise<void>}
     */
    async static sendEmail(to, subject, content, isText, from) {
        return new Promise((resolve, reject) => {
            try {
                resolve("Success!");
            } catch (ex) {
                loggingService.getDefaultLogger().error('[SendGridService]-ERROR: Exception at sendEmail(): ' + JSON.stringify(ex));
                reject(ex);
            }

        })
    }


    /**
     * Function to update email sent count
     * @return {Promise<unknown>}
     */
    async static updateEmailCount() {
        return new Promise((resolve, reject) => {
            try {
                resolve('Success!');
            } catch (ex) {
                loggingService.getDefaultLogger().error('[SendGridService]-ERROR: Exception at updateEmailCount(): ' + JSON.stringify(ex));
                reject(ex);
            }
        });
    }


};
