// API Key: 530f096420d35de2e3711dc20a7b5de8
// https://app.sender.net/api


/*
https://help.sender.net/knowledgebase/id-like-to-use-the-api-is-there-anything-to-help-me-get-started/

{
    "method": "sendTransactionalEmail",
    "params": {
        "api_key": "your_api_key_here",
        "transactional_campaign_id": "your_campaign_id",
        "email": "recipient_email",
        "personalized_data": {"fieldName": "fieldValue", ...},
        "attachments": {"fileName": "fileUrl", ...}
    }
}

 */

module.exports = class SenderService {
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
                loggingService.getDefaultLogger().error('[SenderService]-ERROR: Exception at sendEmail(): ' + JSON.stringify(ex));
                reject(ex);
            }
        });
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
                loggingService.getDefaultLogger().error('[SenderService]-ERROR: Exception at updateEmailCount(): ' + JSON.stringify(ex));
                reject(ex);
            }
        });
    }
}
