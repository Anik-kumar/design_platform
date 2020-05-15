const Designs = require('../models/mongo/designs');
const _ = require('lodash');
const loggerService = require('../services/LoggingService');

module.exports = class UserRepository {

  constructor() { }

  static async createDesign(user_id, design_id, title, titlePath, type, file_size, tags, public_url, description, key, awsName) {
    let result = {}, success = false;
    console.log('userRepo -> ', user_id,design_id,title,titlePath,type,file_size,tags,public_url,description,key,awsName);
    try {
      let udesignObj = {
        user_unique_id: user_id,
        design_id: design_id,
        title: title,
        title_path: titlePath,
        description: description,
        type: type,
        raw_design: {
          title: title,
          file_size: file_size,
          public_url: public_url,
          description: description,
          likes: 0,
          tag: tags,
          key: key,
          aws_name: awsName
        },
        photos: [{
          title: "",
          file_size: 0,
          public_url: "",
          description: "",
          likes: 0,
          tag: [],
          key: "",
          aws_name: ""
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
      console.log("From DesignRepository result => ", result);
      if(!result) {
        success = false;
      }
      
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
      console.log("From DesignRepository result => ", result);
      if(!result) {
        success = false;
      }
    } catch(ex) {
      loggerService.error({message: '[DesignRepository]-ERROR:  Exception at findOne(): ', error: ex});
      success = false;
    }


    return {
      success: success,
      data: result
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
      console.log("From DesignRepository result => ", result);
      if(!result) {
        success = false;
      }
      
    } catch(ex) {
      loggerService.error({message: '[DesignRepository]-ERROR:  Exception at findAll(): ', error: ex});
      success = false;
    }


    return {
      success: success,
      result: result
    }
  }



  static async updateDesign(user_id, design_id, title, type,size, tags,link,description, key, awsName) {
    let result = {}, success = false;
    console.log('userRepo -> ', user_id,design_id,title,type,size,tags,link,description,key,awsName);
    try {
      let udesignObj = {
        "title": title,
        "description": description,
        "type": type,
        "tags": tags,
        "raw_design.title": title,
        "raw_design.description": description,
        "raw_design.tag": tags,
        "raw_design.key": key,
        "raw_design.aws_name": awsName,
        "raw_design.public_url": link,
        "raw_design.file_size": size
      };
      result = await Designs.findOneAndUpdate(
        {
          'user_unique_id': user_id,
          'design_id': design_id
        },
        { $set: udesignObj },
        { useFindAndModify: false }
      );
      success = true;
    } catch (ex) {
      loggerService.error({message: '[UserRepository]-ERROR: Exception at updateDesign(): ', error: ex});
      success = false;
    }

    return {
      data: result,
      success: success
    }
  }

}
