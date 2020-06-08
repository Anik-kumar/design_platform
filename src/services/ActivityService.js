const activityRepository = require('../repository/ActivityRepository');
var {isNil} = require('lodash');
var loggerService = require('../services/LoggingService');

module.exports = class ActivityService {

  constructor() { }

  /**
   *  @param email Email address of the user
   *  @param password Password of the user
   *   @returns { Promise<{result: *, success: *}>}
   */
	static async addActivityLlog(user_id, description, more) {
		let result, success = true, data;

		try {
			result = await activityRepository.create(user_id, description, more);
			if (result.success) {
				data = result.data;
			} else {
				success = false;
			}
		} catch (e) {
            loggerService.error({message: 'Exception error in addActivityLlog() in UserService. ', error: ex});
			//next(e);
		}

		return {
			success: success,
			result: data
		}
    }
    
    /**
    *  @param email Email address of the user
    *  @param password Password of the user
    *   @returns { Promise<{result: *, success: *}>}
    */
	// static async getActivityLogByUser(user_id, offset, limit) {
	// 	let result, success = true, data;

	// 	try {
	// 		result = await activityRepository.getActivityLogByUser(user_id);
	// 		if (result.success) {
	// 			data = result.data;
	// 		} else {
	// 			success = false;
	// 		}
	// 	} catch (e) {
    //         loggerService.error({message: 'Exception error in getActivityLogByUser() in ActivityService. ', error: ex});
	// 		//next(e);
	// 	}

	// 	return {
	// 		success: success,
	// 		data: data
	// 	}
	// }
	
	/**
    *  @param email Email address of the user
    *  @param password Password of the user
    *   @returns { Promise<{result: *, success: *}>}
    */
   static async getActivityLogByUser(user_id, offset, limit) {
	let result, success = true, data;

	try {
		if (isNil(offset)) {
			offset = 0
		}
		if (isNil(limit)) {
			limit = 10
		}
		if (typeof offset != 'number') {
			offset = parseInt(offset, 10);
		}
		if (typeof limit != 'number') {
			limit = parseInt(limit, 10);
		}
		result = await activityRepository.getActivityLogByUser(user_id, offset, limit);
		if (result.success) {
			data = result.data;
		} else {
			success = false;
		}
	} catch (ex) {
		loggerService.error({message: 'Exception error in getActivityLogByUser() in ActivityService. ', error: ex});
	}

	return {
		success: success,
		data: data
	}
}
}