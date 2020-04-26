const express = require('express');
const fs = require('fs');
const _ = require('lodash');
const router = express.Router();
var multer  = require('multer');
const uuidv4 = require('uuid/v4');

const loggingService = require('../services/LoggingService');
const fileService = require('../services/FileService');
const designService = require('../services/DesignService');
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
  let fileOrginalName = null;
  let fileDatabaseName = null;
  console.log('body : ', req.body);
  console.log("user-id -> ", req.user_id);
  if(_.isNil(req.user_id)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }
  try {
    req.file.path = process.env.ROOT_PATH + '/' + req.file.path;
    console.log('file ',req.file);

    /**
     * file object
     * {
        fieldname: 'file',
        originalname: 'brain_3-wallpaper-1366x768.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: 'tmp/',
        filename: 'a87b568a100c538d0e7a3b3845f0aee4',
        path: '/home/anik/workspace-bit/design_platform/tmp/a87b568a100c538d0e7a3b3845f0aee4',
        size: 585380
      }
     */
    

    fileDatabaseName = req.file.filename;
    fileOrginalName = req.file.originalname;
    let designId = uuidv4();
    result = await S3Service.upload(req.file, designId);
    //let result2 = await imgmService.createThumbs(req.file);
    console.log("result => ", result);
    const designInfo = {
      userId: req.user_id,
      designId: designId,
      title: req.body.title,
      type: req.body.type,
      fileSize: req.file.size,
      tags: req.body.tags,
      url: result.Location,
      des: req.body.description
    }
    console.log("designinfo => ", designInfo);

    if(!_.isNil(result.Location)) {
      let designResult = designService.create(designInfo);

      if(designResult.success && !_.isNil(designResult.error)) {
        console.log("fileservice Design Result -> ", designResult);
      }else{
        console.log("fileservice Design Result error");
      }
    }else {
      console.log("fileservice Design Result error");
    }
     // entry in database
    

    /**
     *result object
     * {
        ETag: '"7dc10532e2058d66744cd1398811518d"',
        Location: 'https://s3dpbucket.s3.ap-south-1.amazonaws.com/design/b6689fca-4244-456c-a8d7-0c11503a990c.jpg',
        key: 'design/b6689fca-4244-456c-a8d7-0c11503a990c.jpg',
        Key: 'design/b6689fca-4244-456c-a8d7-0c11503a990c.jpg',
        Bucket: 's3dpbucket'
      }
     */
    fs.unlink(req.file.path, (err) => {
      if (err) throw err;
      console.log('req.file.path was deleted');
    });

  } catch(err) {
    console.log("error ", err);
    // return res.status(500).send('Error: '+ err.message);
  }

  return res.status(200).send(result);

});


module.exports = router;
