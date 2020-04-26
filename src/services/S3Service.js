var AWS = require('aws-sdk');
var fs = require('fs');
var path = require('path');
const IncomingForm = require('formidable').IncomingForm;
const dotenv = require('dotenv');
dotenv.config();
const loggingService = require('./LoggingService');
const designService = require('../services/DesignService');

// var credentials = new AWS.SharedIniFileCredentials({profile: 's3-access'});
var credentials = new AWS.Credentials(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY);
// var credentials = new AWS.SharedIniFileCredentials({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY});
AWS.config.credentials = credentials;
// Set the region
AWS.config.update({region: process.env.AWS_REGION});

// Create S3 service object
s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Create the parameters for calling listObjects
var uploadParams = {
  Bucket : process.env.S3_DESIGN_BUCKET,
  Key: '',
  Body: '',
  ACL:'public-read'
};

class S3Service {

  /**
   * Read File
   * @param req
   * @return {Promise<unknown>}
   */
  static async readFile(req) {
      return new Promise((resolve, reject) => {
          try {
              const form = new IncomingForm();
              form.on('file', (field, file) => {
                  // Do something with the file
                  // e.g. save it to the database
                  // you can access it using file.path
                  console.log(req.file);
                  resolve(file);
              });
              form.on('end', () => {
                  loggingService.info('[S3 SERVICE]--INFO: Form End');
                  //res.json();
              });

              form.parse(req);

          } catch(err) {
              loggingService.error({message: '[S3 SERVICE]-ERROR: Error at readFile()', error: err});
              reject(err);
          }
      });

  }

  /**
   * Function to upload file to AWS S3
   * @param fileObj
   * @return {Promise<unknown>}
   */
  static async upload(fileObj, designId) {
    return new Promise((resolve, reject) => {
      try {
        uploadParams.Body = '';
        uploadParams.Key = '';
        var fileStream = fs.createReadStream(fileObj.path); // file path
        fileStream.on('error', function(err) {
          loggingService.error({message: '[S3 SERVICE]-ERROR: File Error in upload() function.', error: err});
        });
        uploadParams.Body = fileStream;
        uploadParams.Key = 'design/' + designId + path.extname(fileObj.originalname);

        // call S3 to retrieve upload file to specified bucket
        s3.upload (uploadParams, function (err, data) {
          if (err) {
            loggingService.error({message: '[S3 SERVICE]-ERROR: Error in S3 upload() function.', error: err});
            reject(err);
          } if (data) {
            loggingService.info('[S3 SERVICE]-INFO: Upload Success. Image Location: ' + data.Location);
            resolve(data);
          }
        });
      } catch(err) {
        loggingService.error({message: '[S3 SERVICE]-ERROR: Error in upload() function.', error: err});
      }
    });
  }
}

module.exports = {
  upload: S3Service.upload,
  readFile: S3Service.readFile
}
