const _ = require('lodash');
const loggingService = require('../LoggingService');
var rp = require('request-promise');
const SIB_API = 'https://api.sendinblue.com/v3/smtp/email';
const SIB_API_KEY = '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';
const SIB_API_KEY2 = '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';

// https://developers.sendinblue.com/reference#sendtransacemail
// v3 API Key: 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
//

// https://www.npmjs.com/package/sib-api-v3-sdk

/*
curl --request POST \
    --url https://api.sendinblue.com/v3/smtp/email \
    --header 'accept: application/json' \
    --header 'api-key: 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' \
    --header 'content-type: application/json' \
    --data '{"sender":{"name":"Pijus Kumar","email":"pijus.temp@gmail.com"},"to":[{"email":"pijus.sarker@gmail.com","name":"Kumar"}],"textContent":"Hi Pijus, This is a test message 2. Please discard.","subject":"Email testing 2"}'
*/


// SUBSCRIBER LIMIT MONTHLY SEND LIMIT  DAILY SEND LIMIT
// Unlimited	    9,000	            300

module.exports = class SendinBlueService {
    constructor(props) {

    }

    /**
     * Function to send email using SendinBlue
     *
     * @param to
     * @param subject
     * @param content
     * @param isText
     * @param from
     * @return {Promise<void>}
     */
    
    static async sendEmail(apiKey, to, from, subject, content, isText, name) {
        var options = {
            method: 'POST',
            uri: SIB_API,
            headers: {
                'accept': 'application/json',
                'api-key': (apiKey ? apiKey : SIB_API_KEY),
                'content-type': 'application/json'
            },
            body: {
                "sender": {
                    "name": "ET Tech Limited",
                    "email": "itadmin@etlimited.net"
                },
                "to": [{
                    "email": to,
                    "name": "Kumar"
                }],
                "textContent": content,
                "subject": subject
            },
            json: true // Automatically stringifies the body to JSON
        };
         
        rp(options).then(function (parsedBody) {
            console.log('Email Sent.... [messageId: '+parsedBody['messageId']+']');
        }).catch(function (err) {
            console.log('----------- Error ----------. ',err);
        });
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
                loggingService.getDefaultLogger().error('[SendinBlueService]-ERROR: Exception at updateEmailCount(): ' + JSON.stringify(ex));
                reject(ex);
            }
        });
    }
}
