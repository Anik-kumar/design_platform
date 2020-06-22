const _ = require('lodash');
const communicationRepository = require('../repository/CommunicationRepository');
const loggerService = require('../services/LoggingService');

module.exports = class DesignService {
  constructor() {

  }


  static async create(commentObj) {
    let result = {}, success = false, error = null;
    try {
      
      // console.log("Comment obj " , commentObj);
      result = await communicationRepository.addComment(commentObj.sender_id, commentObj.receiver_id, commentObj.design_id, commentObj.comment);
      if (result.success && !_.isNil(result.data)) {
        console.log('Comment creation Successful');
        success = true;
      } else {
        console.log('Comment is not created');
        success = false;
        error = "CommentNotCreated";
      }
    }catch (ex) {
      loggerService.error({message: '[CommunicationService]-ERROR: Exception at create(): ', error: ex});
      success = false;
      error = ex;
    }

    return {
      data: result.data,
      error: error,
      success: success
    }
  }

  // working
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

  // working
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

  

}
