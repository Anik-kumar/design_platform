const Designs = require('../models/mongo/designs');
const _ = require('lodash');
const loggerService = require('../services/LoggingService');

module.exports = class UserRepository {

  constructor() { }

  static async createDesign(user_id, design_id, title, type, file_size, tags, public_url, description) {
    let result = {}, success = false;
    console.log('userRepo -> ', user_id,design_id,title,type,file_size,tags,public_url,description);
    try {
      let udesignObj = {
        user_unique_id: user_id,
        design_id: design_id,
        title: title,
        description: description,
        type: type,
        raw_design: {
          title: title,
          file_size: file_size,
          public_url: public_url,
          description: description,
          likes: 0,
          tag: tags
        },
        photos: [{
          title: title,
          file_size: file_size,
          public_url: public_url,
          description: description,
          likes: 0,
          tag: tags
        }],
        likes: 0,
        comment: [],
        votes: 0,
        tags: tags
      };
      result = await Designs.create(udesignObj);
      success = true;
    } catch (ex) {
      loggerService.error({message: '[UserRepository]-ERROR: Exception at createDesign(): ', error: ex});
      success = false;
    }

    return {
      data: result,
      success: success
    }
  }

  /**
   * returns all designs of user
   * @param {string} filter user id to search design
   */
  static async findDesgins(filter) {
    let success = true;
    let result;
    console.log("From DesignRepository => ", filter);

    try{
      result = await Designs.find({
        "user_unique_id": filter
      }).exec();
      
    } catch(ex) {
      loggerService.error({message: '[DesignRepository]-ERROR:  Exception at findDesigns(): ', error: ex});
      success = false;
    }


    return {
      success: success,
      result: result
    }
  }

  /**
   * returns one design of user
   * @param {object} filter obj to search
   */
  static async findOne(filter) {
    let success = true;
    let result = {};
    console.log("From DesignRepository => ", filter);

    try{
      result = await Designs.findOne(filter).exec();
    } catch(ex) {
      loggerService.error({message: '[DesignRepository]-ERROR:  Exception at find(): ', error: ex});
      success = false;
    }


    return {
      success: success,
      result: result
    }
  }

  /**
   * returns all designs of user
   * @param {object} filter oject to search
   */
  static async findAll(filter) {
    let success = true;
    let result;
    console.log("From DesignRepository => ", filter);

    try{
      result = await Designs.find(filter).exec();
      
    } catch(ex) {
      loggerService.error({message: '[DesignRepository]-ERROR:  Exception at findAll(): ', error: ex});
      success = false;
    }


    return {
      success: success,
      result: result
    }
  }

}
