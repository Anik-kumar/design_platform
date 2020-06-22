const Communications = require('../models/mongo/communication');
const _ = require('lodash');
const loggerService = require('../services/LoggingService');

module.exports = class CommunicationRepository {

  constructor() { }



  /**
   * adds comment to db
   * returns all designs in db
   * 
   */
  static async addComment(sender, receiver, design, comment) {
    let success = true;
    let result;
    let data = {
      from_user_id: sender,
      to_user_id: receiver,
      context_id: design,
      comment: comment
    }

    try{
      result = await Communications.create(data);
      // console.log("From CommunicationRepository result => ", result);
      if(!result) {
        success = false;
      }
    } catch(ex) {
      loggerService.error({message: '[CommunicationRepository]-ERROR:  Exception at addComment(): ', error: ex});
      success = false;
    }

    return {
      success: success,
      data: result
    }
  }



}
