const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
// 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

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
    static async sendEmail(apiKey, to, from, subject, content, isText, name) {
        let result = null;
        sgMail.setApiKey(apiKey);
        try {
            const msg = {
                to: to,
                from: from,
                subject: subject,
                html: content
            };
            result = await sgMail.send(msg);
        } catch (ex) {
            loggingService.getDefaultLogger().error('[SendGridService]-ERROR: Exception at sendEmail(): ' + (ex.message || ''));
        }
       return result;
    }


    /**
     * Function to update email sent count
     * @return {Promise<unknown>}
     */
    static async updateEmailCount() {
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
