const _ = require('lodash');
const designRepository = require('../repository/DesignRepository');
const loggerService = require('../services/LoggingService');

module.exports = class DesignService {
  constructor() {

  }

  static sanitaizeTitle(title) {
    let newTitle = title.replace(/[^a-zA-Z0-9]/g, '-');
    return newTitle;
  }

  static async create(designObj) {
    let result = {}, success = false, error = null;
    try {
      let titlePath = DesignService.sanitaizeTitle(designObj.title);
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

  static async updateOne(filterObj, designObj) {
    let result = {}, success = false, error = null;
    try {
      result = await designRepository.updateDesignState(filterObj, designObj);
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

  static async findAllInDB() {
    let result = {}, success = false, error = null;
    try {
      result = await designRepository.findAllInDb();
      if (result.success && !_.isNil(result.data)) {
        console.log('Designs retrived successful');
        success = true;
      } else {
        console.log('Design is not retrived', result);
        success = false;
        error = "DesignNotRetrived";
      }
    }catch (ex) {
      loggerService.error({message: '[DesignService]-ERROR: Exception at findAllInDB(): ', error: ex});
      success = false;
      error = ex;
    }

    return {
      data: result.data,
      error: error,
      success: success
    }
  }

  static async findDesignsAdminSubmitted(adminId) {
    let result = {}, success = false, error = null;
    try {
      result = await designRepository.findOnlyForAdminUser({"raw_design.reviewer": "", "whereami.current_state": "submitted", });
      if (result.success && !_.isNil(result.data)) {
        console.log('Designs retrived successful');
        success = true;
      } else {
        console.log('Design is not retrived', result);
        success = false;
        error = "DesignNotRetrived";
      }
    }catch (ex) {
      loggerService.error({message: '[DesignService]-ERROR: Exception at findAllSubmitted(): ', error: ex});
      success = false;
      error = ex;
    }

    return {
      data: result.data,
      error: error,
      success: success
    }
  }

  static async findDesignsAdminApproved(userId) {
    let result = {}, success = false, error = null;
    try {
      result = await designRepository.findOnlyForAdminUser({"user_unique_id": userId, "whereami.current_state": "approved"});
      if (result.success && !_.isNil(result.data)) {
        console.log('Designs retrived successful');
        success = true;
      } else {
        console.log('Design is not retrived', result);
        success = false;
        error = "DesignNotRetrived";
      }
    }catch (ex) {
      loggerService.error({message: '[DesignService]-ERROR: Exception at findAllSubmitted(): ', error: ex});
      success = false;
      error = ex;
    }

    return {
      data: result.data,
      error: error,
      success: success
    }
  }

  static async findDesignsAdminRejected(userId) {
    let result = {}, success = false, error = null;
    try {
      result = await designRepository.findOnlyForAdminUser({"user_unique_id": userId, "whereami.current_state": "rejected"});
      if (result.success && !_.isNil(result.data)) {
        console.log('Designs retrived successful');
        success = true;
      } else {
        console.log('Design is not retrived', result);
        success = false;
        error = "DesignNotRetrived";
      }
    }catch (ex) {
      loggerService.error({message: '[DesignService]-ERROR: Exception at findAllSubmitted(): ', error: ex});
      success = false;
      error = ex;
    }

    return {
      data: result.data,
      error: error,
      success: success
    }
  }

  static async findDesignsAdminReviewing(adminId) {
    let result = {}, success = false, error = null;
    try {
      result = await designRepository.findOnlyForAdminUser({"raw_design.reviewer": adminId, "whereami.current_state": "reviewing"});
      if (result.success && !_.isNil(result.data)) {
        console.log('Designs retrived successful');
        success = true;
      } else {
        console.log('Design is not retrived', result);
        success = false;
        error = "DesignNotRetrived";
      }
    }catch (ex) {
      loggerService.error({message: '[DesignService]-ERROR: Exception at findAllSubmitted(): ', error: ex});
      success = false;
      error = ex;
    }

    return {
      data: result.data,
      error: error,
      success: success
    }
  }

  static async findDesignsByState(state) {
    let result = {}, success = false, error = null;
    try {
      result = await designRepository.findOnlyForAdminUser({"whereami.current_state": state});
      if (result.success && !_.isNil(result.data)) {
        console.log('Designs retrived successful');
        success = true;
      } else {
        console.log('Design is not retrived', result);
        success = false;
        error = "DesignNotRetrived";
      }
    }catch (ex) {
      loggerService.error({message: '[DesignService]-ERROR: Exception at findDesignsByState(): ', error: ex});
      success = false;
      error = ex;
    }

    return {
      data: result.data,
      error: error,
      success: success
    }
  }

  static async findDesignsByStateAndId(userId, state) {
    let result = {}, success = false, error = null;
    try {
      result = await designRepository.findOnlyForAdminUser({"raw_design.reviewer": userId, "whereami.current_state": state});
      if (result.success && !_.isNil(result.data)) {
        console.log('Designs retrived successful');
        success = true;
      } else {
        console.log('Design is not retrived', result);
        success = false;
        error = "DesignNotRetrived";
      }
    }catch (ex) {
      loggerService.error({message: '[DesignService]-ERROR: Exception at findDesignsByStateAndId(): ', error: ex});
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
