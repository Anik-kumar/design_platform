const _ = require('lodash');
const fs = require('fs');
const { exec } = require("child_process");
const bcrypt = require('bcrypt');

const Users = require('../models/mongo/users');
const userRepository = require('../repository/UserRepository');
const designRepository = require('../repository/DesignRepository');

const jwtService = require('../services/JwtService');
const loggerService = require('../services/LoggingService');
const emailService = require('../services/email/EmailService');


module.exports = class UserService {
	constructor() {

	}

	/** 
	 * user login
	 * @param {string} email 
	 * @param {string} pass 
	 * @returns { Promise<{data: object, token: string, success: boolean}>}
	 */
	static async getUser(email, pass) {
		let result = {}, success = true, token = '';
		try {
			result = await userRepository.getUser(email, pass);
			console.log('result: ', result);
			if (result.success && result.data != null && result.data.length > 0) {
				let signedToken = await jwtService.sign({
					email: result.data[0].email,
					pass: result.data[0].pass
				});

				console.log('token>> ', signedToken);
				token = signedToken;
				result = result.data[0];
			} else {
				result = {};
				success = false;
			}
		} catch (ex) {
			loggerService.getDefaultLogger().error('[UserService]-ERROR: Exception at getUser(): ' + JSON.stringify(ex));
			success = false;
		}

		return {
			data: result,
			token: token,
			success: success
		}
	}

	/**
	 *  @param email Email address of the user
	 *   @param password Password of the user
	 *   @returns { Promise<{result: *, success: *}>}
	 */
	static async findUserByEmailAndPassword(email, password) {
		let result, success = true, data;

		try {
			result = await userRepository.getUserByEmail(email);
			if (result.success) {
				data = result.data[0];
				let matched = await bcrypt.compare(password, data['pass']);
				if (!matched) {
					data = {};
				}
			} else {
				success = false;
			}
		} catch (e) {
			console.log("Exception error in findUserByEmailAndPassword() in UserService. " + e);
			next(e);
		}

		return {
			success: success,
			result: data
		}

	}

	/** 
	 * user registration
	 * @param {string} userEmail 
	 * @return { Promise<{data: object, token: string, success: boolean}>}
	 */
	static async signup(signup) {
		let result = {}, success = true, token = '';
		try {
			// let subscription = await subscriptionService.getSubscriptionByCode(signup.subscription);
			// console.log('subscription: ', subscription);
			// if (subscription.success) {
			// 	signup.subscription = subscription.data;
			// }

			result = await userRepository.createUser(signup.unique_id, signup.email, signup.pass, signup.userType, signup.firstName, signup.lastName, signup.phone, signup.gender, signup.dob);
			if (result.success) {
				// try {
				// 	let signedToken = await jwtService.sign({
				// 		email: result.data.email,
				// 		pass: result.data.pass
				// 	});
				// token = signedToken;
				// } catch(ex) {
				// 	loggerService.getDefaultLogger().error('[UserService]-ERROR: Exception on creating token: ' + JSON.stringify(ex));
				// }

				console.log('Registration Successful');

			}
		}catch (ex) {
			loggerService.getDefaultLogger().error('[UserService]-ERROR: Exception at sigup(): ' + JSON.stringify(ex));
			success = false;
		}

		return {
			data: result.data,
			token: token,
			success: success
		}
	}

	/**
	 * verify usermail
	 * @param {string} userEmail 
	 * @return { Promise<{error: string, success: boolean}>}
	 */
  static async verifyUserEmail(userEmail) {
    let result;
    let found = true;
		let err = '';
		let updateUser;

    try{
      // result = await userRepository.findOne({'email': userEmail, 'verification.email.email_sent': true});
	  //
      // if(result.success) {
		// updateUser = await userRepository.updateOne({
		// 	'email': userEmail,
		// 	'verification.email.email_sent': true
		// }, {
		// 	'verification.email.verified': true,
		// 	'verification.email.email_sent': false,
		// 	'is_verified': true,
		// });
	  //
		// if(updateUser.success) {
		// 	found = true;
		// 	console.log('UserService>>  User verify status updated');
		// }else {
		// 	found = false;
		// 	console.log('UserService>>  User verify status update failed');
		// }
      // }else {
		// 		found = false;
		// 		console.log('UserService>>  User not found');
      // }
		updateUser = await userRepository.updateOne({
			'email': userEmail,
			'verification.email.email_sent': true
		}, {
			'verification.email.verified': true,
			'verification.email.email_sent': false,
			'is_verified': true,
		});
		console.log('updateUser:', updateUser);
		if(updateUser.success && !_.isNil(updateUser.result) && updateUser.result.n == 1 &&  updateUser.result.nModified == 1 && updateUser.result.ok == 1 ) {
			found = true;
			console.log('UserService>>  User verify status updated');
		}else {
			found = false;
			console.log('UserService>>  User verify status update failed');
		}
    } catch (e) {
      console.log("Exception error in verifyUserEmail() in UserService. " + e);
      found = false;
			err = e;
    }

    return {
      error: err,
      success: found
    }

	}

	/**
	 * Search for duplicate emails
	 * @param {string} userEmail 
	 * @return { Promise<{error: string, success: boolean}>}
	 */
	static async searchDupEmail(userEmail) {
    let result;
    let found;
		let err = null;

    try{
			result = await userRepository.findOne({'email': userEmail});

      if(result.success && !_.isNil(result.result) && !_.isEmpty(result.result)) {
				found = true;
      }else {
				found = false;
				console.log('UserService>>  User not found');
      }
    } catch (e) {
      console.log("Exception error in verifyUserEmail() in UserService. " + e);
      found = false;
			err = e;
    }

    return {
      error: err,
      success: found
    }

	}

	/**
	 * Verifies email and sends a verification email to user
	 * @param {string} userEmail 
	 * @return { Promise<{error: string, success: boolean}>}
	 */
	static async sendResetPassVerification(userEmail) {
    let result;
    let found;
		let err = null;
		let updateUser;

    try{
			// checking if user exists
			result = await userRepository.findOne({
				'email': userEmail,
				'verification.is_reset_pass_active': false});
			// console.log("-> User => ", result);
			// console.log("-> User firstname => ", result.result.name.first);
			// console.log("-> User lastname => ", result.result.name.last);

      if(result.success && !_.isNil(result.result) && !_.isEmpty(result.result)) {
				found = true;
				const tmpFirst = result.result.name.first;
				const tmpLast = result.result.name.last;
				const tmpName = tmpFirst + " " + tmpLast;


				// generating jwt token
				let emailVerifyToken = await jwtService.signHS256({'email': userEmail}, {'expiresIn': 10*60});
				// generating link
				let link = "http://localhost:4200/password/verify?lang=en&token=";
				if (emailVerifyToken.auth == true) {
					link += emailVerifyToken.token;
				}

				console.log("Link => ", link);
				// reading template file
				try {

					let content = await fs.readFileSync('./src/email/forgot-pass.html', 'utf8', (err, data) => {
						if(err) {
							return console.log("File Reading Error " , err);
						}

						let fileResult = data.replace(/URL_LINK/g, link);
						fileResult = fileResult.replace(/USER_NAME/g, tmpName);
						// sending verification email
						emailService.prepareToSendEmail(userEmail, 'Reset Password Verification',fileResult, 'Design Platform');

						// updating user 'is_reset_pass_active' status
						updateUser = userRepository.updateOne({
							'email': userEmail,
							'verification.is_reset_pass_active': false
						}, {
							'verification.is_reset_pass_active': true
						});

						if(updateUser.success) {
							found = true;
							console.log('UserService>>  User status updated');
						}else {
							found = false;
							console.log('UserService>>  User status not found');
						}

					});
				} catch(err) {
					console.log(err)
				}

      }else {
				found = false;
				console.log('UserService>>  User not found');
      }
    } catch (e) {
      console.log("Exception error in verifyUserEmail() in UserService. " + e);
      found = false;
			err = e;
    }

    return {
      error: err,
      success: found
    }

	}

	/**
	 * Updates user password
	 * @param {string} userEmail 
	 * @param {string} userPass 
	 * @return { Promise<{error: string, success: boolean}>}
	 */
	static async verifyResetPass(userEmail, userPass) {
		let result;
    let found = true;
		let err = '';
		let updateUser;

    try{
      result = await userRepository.findOne({'email': userEmail, 'verification.is_reset_pass_active': true});

      if(result.success) {

				updateUser = await userRepository.updateOne({
					'email': userEmail,
					'verification.is_reset_pass_active': true
				}, {
					'pass': userPass,
					'verification.is_reset_pass_active': false
				});

				if(updateUser.success) {
					found = true;
					console.log('UserService>>  User verify status updated');
				}else {
					found = false;
					console.log('UserService>>  User verify status update failed');
				}
      }else {
				found = false;
				console.log('UserService>>  User not found');
      }
    } catch (e) {
      console.log("Exception error in verifyUserEmail() in UserService. " + e);
      found = false;
			err = e;
    }

    return {
      error: err,
      success: found
		}

	}

	/**
	 * Updates user password
	 * @param {string} userEmail 
	 * @param {string} userPass 
	 * @return { Promise<{error: string, success: boolean}>}
	 */
	static async uploadDesign(postTitle, title, type, tags, description) {
		let result;
    let found = true;
		let err = '';
		let updateUser;

    try{
      result = await userRepository.findOne({'email': userEmail, 'verification.is_reset_pass_active': true});

      if(result.success) {

				updateUser = await userRepository.updateOne({
					'email': userEmail,
					'verification.is_reset_pass_active': true
				}, {
					'pass': userPass,
					'verification.is_reset_pass_active': false
				});

				if(updateUser.success) {
					found = true;
					console.log('UserService>>  User verify status updated');
				}else {
					found = false;
					console.log('UserService>>  User verify status update failed');
				}
      }else {
				found = false;
				console.log('UserService>>  User not found');
      }
    } catch (e) {
      console.log("Exception error in verifyUserEmail() in UserService. " + e);
      found = false;
			err = e;
    }

    return {
      error: err,
      success: found
		}

	}


	/**
	 * Updates user password
	 * @param {string} userEmail 
	 * @param {string} userPass 
	 * @return { Promise<{error: string, success: boolean}>}
	 */
	static async getDesigns(userId) {
		let result;
    let found = true;
		let err = '';

    try{
      result = await designRepository.findAll({ 'user_unique_id': userId });

      if(result.success) {
				found = true;
				console.log("UserService>> Designs: ", result.result);
      }else {
				found = false;
				console.log('UserService>>  User not found');
      }
    } catch (e) {
      console.log("Exception error in verifyUserEmail() in UserService. " + e);
      found = false;
			err = e;
    }

    return {
      error: err,
			success: found,
			data: result
		}

	}

};
