// https://developers.sendinblue.com/reference#sendtransacemail
// v3 API Key: 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
//


/*
# ------------------
    # Create a campaign \
# ------------------
    curl -H 'api-key:YOUR_API_V3_KEY' \
-X POST -d '{ \

# Define the campaign settings \
"name":"Campaign sent via the API", \
"subject":"My subject", \
"sender": { "name": "From name", "email":"pijus.temp@gmail.com" }, \
"type": "classic", \

# Content that will be sent \
"htmlContent": "Congratulations! You successfully sent this example campaign via the Sendinblue API.", \

# Select the recipients\
"recipients": { "listIds": [2,7] }, \

# Schedule the sending in one hour\
"scheduledAt": "2018-01-01 00:00:01", \

}'
'https://api.sendinblue.com/v3/emailCampaigns'
*/

// https://www.npmjs.com/package/sib-api-v3-sdk


/*
curl --request POST \
    --url https://api.sendinblue.com/v3/smtp/email \
    --header 'accept: application/json' \
    --header 'api-key: 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' \
    --header 'content-type: application/json' \
    --data '{"sender":{"name":"Pijus Kumar","email":"pijus.temp@gmail.com"},"to":[{"email":"pijus.sarker@gmail.com","name":"Kumar"}],"textContent":"Hi Pijus, This is a test message 2. Please discard.","subject":"Email testing 2"}'


*/




module.exports = class SendinBlueService {
    constructor() {

    }
}
