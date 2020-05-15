const _ = require('lodash');
const designRepository = require('../repository/DesignRepository');
const loggerService = require('../services/LoggingService');

module.exports = class DesignService {
  constructor() {

  }


  static async create(designObj) {
    let result = {}, success = false, error = null;
    try {
      let titlePath = sanitaizeTitle(title);
      result = await designRepository.createDesign(designObj.userId, designObj.designId, designObj.title, titlePath, designObj.type, designObj.fileSize, designObj.tags, designObj.url ,designObj.des, designObj.key, designObj.awsName);
      if (result.success && !_.isNil(result.data)) {
        console.log('Design creation Successful');
        success = true;
      } else {
        console.log('Design is not created');
        success = false;
        error = "DesignNotCreated";
      }
    }catch (ex) {
      loggerService.error({message: '[DesignService]-ERROR: Exception at create(): ', error: ex});
      success = false;
      error = ex;
    }

    return {
      data: result.data,
      error: error,
      success: success
    }
  }

  static async findOne(designObj) {
    let result = {}, success = false, error = null;
    try {
      result = await designRepository.findOne(designObj);
      if (result.success && !_.isNil(result.data)) {
        console.log('Design retrived successful');
        success = true;
      } else {
        console.log('Design is not retrived', result);
        success = false;
        error = "DesignNotRetrived";
      }
    }catch (ex) {
      loggerService.error({message: '[DesignService]-ERROR: Exception at findOne(): ', error: ex});
      success = false;
      error = ex;
    }

    return {
      data: result.data,
      error: error,
      success: success
    }
  }

  static async update(designObj) {
    let result = {}, success = false, error = null;
    try {
      result = await designRepository.updateDesign(designObj.userId, designObj.designId, designObj.title, designObj.type, designObj.fileSize, designObj.tags, designObj.url ,designObj.des, designObj.key, designObj.awsName);
      if (result.success && !_.isNil(result.data)) {
        console.log('Design update Successful');
        success = true;
      } else {
        console.log('Design is not updated');
        success = false;
        error = "DesignNotUpdated";
      }
    }catch (ex) {
      loggerService.error({message: '[DesignService]-ERROR: Exception at update(): ', error: ex});
      success = false;
      error = ex;
    }

    return {
      data: result.data,
      error: error,
      success: success
    }
  }

  static async updateWithoutFile(designObj) {
    let result = {}, success = false, error = null;
    try {
      result = await designRepository.updateDesign(designObj.userId, designObj.designId, designObj.title, designObj.type, designObj.tags ,designObj.des);
      if (result.success && !_.isNil(result.data)) {
        console.log('Design update Successful');
        success = true;
      } else {
        console.log('Design is not updated');
        success = false;
        error = "DesignNotUpdated";
      }
    }catch (ex) {
      loggerService.error({message: '[DesignService]-ERROR: Exception at update(): ', error: ex});
      success = false;
      error = ex;
    }

    return {
      data: result.data,
      error: error,
      success: success
    }
  }

  static async getDesignId(user_id) {
    let result = {}, success = false, error = null;
    try {
      result = await designRepository.findOne(user_id);
      if (result.success && !_.isNil(result.data)) {
        console.log('Design ID retrived successful');
        success = true;
      } else {
        console.log('Design ID is not retrived', result);
        success = false;
        error = "DesignIDNotRetrived";
      }
    }catch (ex) {
      loggerService.error({message: '[DesignService]-ERROR: Exception at getDesignId(): ', error: ex});
      success = false;
      error = ex;
    }

    return {
      data: result.data,
      error: error,
      success: success
    }
  }



  sanitaizeTitle(title) {
    let newTitle = title.replace(/[^a-zA-Z0-9]/g, '-');
    return newTitle;
  }

}
