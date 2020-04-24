var Designs = require('../models/mongo/designs');
var _ = require('lodash');
var loggerService = require('../services/LoggingService');

module.exports = class UserRepository {

    constructor() { }

    static async createDesign(user_id, design_id, title, type, file_name, file_size, public_url, description) {
        let result = {}, success = true;
        try {
            let udesignObj = {
                user_unique_id: user_id,
                design_id: design_id,
                title: title,
                type: type,
                raw_design: {
                    file_name: file_name,
                    file_size: file_size,
                    public_url: public_url,
                    description: description,
                    likes: 0,
                    tag: []
                },
                photos: [{
                    file_name: file_name,
                    file_size: file_size,
                    public_url: public_url,
                    description: description,
                    title: title,
                    likes: 0,
                    tag: []
                }],
                likes: 0,
                comment: [],
                votes: 0,
                tags: []
            };
            result = await Designs.create(udesignObj);
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
