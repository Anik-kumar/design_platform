const _ = require('lodash');
const designRepository = require('../repository/DesignRepository');

module.exports = class DesignService {
  constructor() {

  }


  static async create(designObj) {
    let result = {}, success = false, error = null;
    try {
      result = await designRepository.createDesign(designObj.userId, designObj.designId, designObj.title, designObj.type, designObj.fileSize, designObj.tags, designObj.url ,designObj.des);
      if (result.success && !_.isNil(result.data)) {
        console.log('Design creation Successful');
        success = true;
      } else {
        console.log('Design is not created');
        success = false;
        error = "DesignNotCreated";
      }
    }catch (ex) {
      loggerService.error({message: '[DesignService]-ERROR: Exception at sigup(): ', error: ex});
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

}
