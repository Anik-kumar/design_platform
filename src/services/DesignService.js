const _ = require('lodash');
const designRepository = require('../repository/DesignRepository');

module.exports = class DesignService {
    constructor() {

    }


    static async create(designObj) {
        let result = {}, success = true, token = '';
        try {
           result = await designRepository.createDesign(designObj.user_id, designObj.design_id, designObj.title, designObj.type, designObj.file_name, designObj.file_size, designObj.public_url, designObj.description);
            if (result.success) {
                console.log('Design creation Successful');
            }
        }catch (ex) {
            loggerService.error({message: '[DesignService]-ERROR: Exception at sigup(): ', error: ex});
            success = false;
        }

        return {
            data: result.data,
            token: token,
            success: success
        }
    }
}
