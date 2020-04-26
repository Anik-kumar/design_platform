var Designs = require('../models/mongo/designs');
var _ = require('lodash');
var loggerService = require('../services/LoggingService');

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
        tags: []
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

}
