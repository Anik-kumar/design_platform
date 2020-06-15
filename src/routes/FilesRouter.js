const express = require('express');
const fs = require('fs');
const _ = require('lodash');
const router = express.Router();
var multer  = require('multer');
const uuidv4 = require('uuid/v4');
const uuidv1 = require('uuid/v1');

const loggingService = require('../services/LoggingService');
const fileService = require('../services/FileService');
const designService = require('../services/DesignService');
const activityService = require('../services/ActivityService');
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
    const designId = uuidv4();
    const designAwsName = uuidv1();
    result = await S3Service.upload(req.file, designAwsName);
    //let result2 = await imgmService.createThumbs(req.file);
    console.log("result => ", result);
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
    // entry in database
    const designInfo = {
      userId: req.user_id,
      designId: designId,
      title: req.body.title,
      type: req.body.type,
      fileSize: req.file.size,
      url: result.Location,
      des: req.body.description,
      key: result.key,
      awsName: designAwsName,
      tags: req.body.tags.split(',')
    }
    console.log("designinfo => ", designInfo);

    if(!_.isNil(result.Location)) {
      let designResult = await designService.create(designInfo);
      await activityService.addActivityLlog(designInfo.userId, "User " + designInfo.userId + ', created new design,' + designInfo.title + ', at ' + new Date().toISOString(), [designInfo]);  

      if(designResult.success && !_.isNil(designResult.error)) {
        console.log("fileservice Design Result -> ", designResult);
      } else{
        console.log("fileservice Design Result error ", designResult);
      }
    } else {
      console.log("Error in uploading design in S3");
    }
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


router.post('/update-file', uploader.single('file'), async function(req, res, next) {
  let result = [];
  let fileOrginalName = null;
  let fileDatabaseName = null;
  let deleteResult = [];
  console.log('body : ', req.body);
  console.log("user-id -> ", req.user_id);
  if(_.isNil(req.user_id)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }
  try {

    const designObj = await designService.findOne({"user_unique_id" : req.user_id});
    const designId = req.body.design_id;
    const oldDesignAwsName = designObj.data.raw_design.aws_name;
    const oldDesignKey = designObj.data.raw_design.key;
    console.log(designObj.data);

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
    const designAwsName = uuidv1();
    result = await S3Service.upload(req.file, designAwsName);
    //let result2 = await imgmService.createThumbs(req.file);
    console.log("result => ", result);
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
    // entry in database
    const designInfo = {
      userId: req.user_id,
      designId: designId,
      title: req.body.title,
      type: req.body.type,
      fileSize: req.file.size,
      tags: req.body.tags.split(','),
      url: result.Location,
      des: req.body.description,
      key: result.key,
      awsName: designAwsName
    }
    console.log("designinfo => ", designInfo);

    if(result.Location.includes('.amazonaws.com/') && result.Bucket) {
      let designResult = await designService.update(designInfo);

      if(designResult.success && _.isNil(designResult.error)) {
        console.log("fileservice Design Result -> ", designResult);
        deleteResult = await S3Service.delete(oldDesignKey);
        console.log("Delete Result ", deleteResult);
      }else{
        console.log("filerouter Design Result error 2");
      }
    }else {
      console.log("filerouter Design Result error 1");
    }
     
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


router.post('/update', async (req, res, next) => {
  console.log("updatedesign => ", req.user_id);
  console.log("updatedesign ", req.body);
  let response = {};

  if(_.isNil(req.user_id)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }

  try {
    const updateInfo = {
      userId: req.user_id,
      designId: req.body.design_id,
      title: req.body.title,
      type: req.body.type,
      tags: req.body.tags,
      des: req.body.description
    }

    const result = await designService.updateWithoutFile(updateInfo);
    console.log("Result -> ", result);
    
    if(!_.isNil(result.data) && result.success && result.error==null) {
      response.message = "Design is updated";
      response.error = null;
      response.success = true;
    } else {
      response.message = "Failed to update design";
      response.error = result.error;
      response.success = false;
    }
    res.status(200);
  } catch(err) {
    loggingService.error({message: '[FilesRouter]-ERROR: Exception at /update: ', error: ex});
  }

  return res.send(response);
});


router.get('/delete', async (req, res, next) => {
  
  try {
    result = await S3Service.delete("design/7ad0a95b-3cb7-4574-a8b8-5c7630428029.jpg");
    console.log(result);
    res.status(200);
    return res.send(result);
  } catch(err) {
    loggingService.error({message: '[FilesRouter]-ERROR: Exception at /update: ', error: ex});
  }

  // return res.send(response);
});


module.exports = router;
