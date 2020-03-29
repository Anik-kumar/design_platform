const Users = require('../models/mongo/users');
const _ = require('lodash');
const userRepository = require('../repository/UserRepository');
const jwtService = require('../services/JwtService');
const loggerService = require('../services/LoggingService');


module.exports = class UserService {
	constructor() {

	}

	static async getUser(email, pass) {
		let result = {}, success = true, token = '';
		try {
			result = await userRepository.getUser(email, pass);
			console.log('result: ', result);
			if (result.success) {
				let signedToken = await jwtService.sign({
					email: result.data[0].email,
					pass: result.data[0].pass
				});

				console.log('token>> ', signedToken);
				token = signedToken;
			}
		} catch (ex) {
			loggerService.getDefaultLogger().error('[UserService]-ERROR: Exception at getUser(): ' + JSON.stringify(ex));
			success = false;
		}

		return {
			data: result.data[0],
			token: token,
			success: success
		}
	}

	static async sigup(signup) {
		let result = {}, success = true, token = '';
		try {
			let subscription = await subscriptionService.getSubscriptionByCode(signup.subscription);
			console.log('subscription: ', subscription);
			if (subscription.success) {
				signup.subscription = subscription.data;
			}
			result = await userRepository.createUser(signup.subscription, signup.email, signup.password, signup.firstName, signup.lastName ); 
			if (result.success) {
				try {
					let signedToken = await jwtService.sign({
						email: result.data.email,
						pass: result.data.pass
					});
				token = signedToken;
				} catch(ex) {
					loggerService.getDefaultLogger().error('[UserService]-ERROR: Exception on creating token: ' + JSON.stringify(ex));
				}   
			}
		}catch (ex) {
			loggerService.getDefaultLogger().error('[UserService]-ERROR: Exception at sigup(): ' + JSON.stringify(ex));
			success = false;
		}

		return {
			data: result,
			token: token,
			success: success
		}
	}
};
