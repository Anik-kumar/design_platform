const dotenv = require('dotenv');
var AWS = require('aws-sdk');
dotenv.config();

// var credentials = new AWS.SharedIniFileCredentials({profile: 's3-access'});
// var credentials = new AWS.Credentials(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY);
var credentials = new AWS.SharedIniFileCredentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY});

AWS.config.credentials = credentials;

// Set the region
AWS.config.update({region: process.env.AWS_REGION});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Create the parameters for calling listObjects
var bucketParams = {
    Bucket : process.env.S3_DESIGN_BUCKET,
};


// Call S3 to obtain a list of the objects in the bucket
s3.listObjects(bucketParams, function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data);
    }
});
