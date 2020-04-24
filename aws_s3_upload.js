// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
var uuid = require('uuid');
const uuidv4 = require('uuid/v4');
var credentials = new AWS.SharedIniFileCredentials({profile: 's3-access'});
AWS.config.credentials = credentials;

// Set the region
AWS.config.update({region: 'ap-south-1'});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

// call S3 to retrieve upload file to specified bucket
var uploadParams = {Bucket: process.argv[2], Key: '', Body: '', ACL:'public-read'};
var file = process.argv[3];

// Configure the file stream and obtain the upload parameters
var fs = require('fs');
var fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
    console.log('File Error', err);
});
uploadParams.Body = fileStream;
var path = require('path');


uploadParams.Key = 'design/' + uuidv4() + path.extname(file);
// https://s3dpbucket.s3.ap-south-1.amazonaws.com/design/f27d2b27-2b10-4840-a348-fb0dfa6b2f51.png
console.log(uploadParams.Key);
// call S3 to retrieve upload file to specified bucket
s3.upload (uploadParams, function (err, data) {
    if (err) {
        console.log("Error", err);
    } if (data) {
        console.log("Upload Success", data.Location);
    }
});
