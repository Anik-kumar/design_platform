const express = require('express');
const fs = require('fs');
const router = express.Router();
var multer  = require('multer');
const loggingService = require('../services/LoggingService');
const fileService = require('../services/FileService');
const S3Service = require('../services/S3Service');
const imgmService = require('../services/ImageManipulationService');
const { GoogleCloudStorageService, GCStorage, createBucket, listBuckets, verifyAuthentication} = require('../services/GoogleCloudStorageService');

const uploader = multer({
  dest: 'tmp/',
  limits: {
    fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  }
});
/**
 * Check google cloud storage authentication.
 * In Progress
 */
router.post('/gcs-auth', async function(req, res, next) {
  let buckets = [];
  try {
    buckets = await verifyAuthentication();
    console.log('buckets:', buckets);
  } catch(err) {
    console.log("error ", err);
    return res.status(500).send('Error: '+ err.message);
  }

  return res.status(200).send(buckets);
});

/**
 * Upload image cloud storage
 */
router.post('/upload', uploader.single('file'), async function(req, res, next) {
  let result = [];
  try {
    req.file.path = process.env.ROOT_PATH + '/' + req.file.path;
    console.log('file ',req.file);

    result = await S3Service.upload(req.file);
    //let result2 = await imgmService.createThumbs(req.file);
    fs.unlink(req.file.path, (err) => {
      if (err) throw err;
      console.log('req.file.path was deleted');
    });

  } catch(err) {
    console.log("error ", err);
    return res.status(500).send('Error: '+ err.message);
  }

  return res.status(200).send(result);

});


module.exports = router;
