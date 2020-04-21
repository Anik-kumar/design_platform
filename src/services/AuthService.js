const session = require('express-session');
const ConfigLoader = require('../config/ConfigLoader');
const jwtService = require('../services/JwtService');
const userRepository = require('../repository/UserRepository');
const _ = require('lodash');
const config = new ConfigLoader();

module.exports = class AuthService {

	constructor() {
		this.sessionStore = new session.MemoryStore();
	}

	static getSessionStore() {
		return this.sessionStore;
	}


	async isAuthorized(req, res) {
		let response = false;
		try {
			if(_.isNil(req.header.authorization) || _.isEmpty(req.header.authorization)) {
				return response;
			}
			let token = req.header.authorization.slice(7);
			let verified = await jwtService.verify(token);
			response = true;
			console.log('verified: ', verified);
		} catch (ex) {
			console.log(ex);
		}
		return response;
	}


	static async getToken(user, pass) {
		var user = { user, pass };
		const token = jwt.sign({user}, config.secret);

		console.log("Token Created => " , token);
		return token;
	}


	static async getTokenWithExpireTime(user, unique_id, time) {
		if (time == null || time == undefined) {
			time = config.tokenExpiryTime;
		}
		// var user = { user, pass };
		// const token = jwt.sign({user}, config.secret, {
		// 	expiresIn: time // in sec.
		// });

		let signedToken = await jwtService.sign({
			email: user,
			unique_id: unique_id
		}, {
			expiresIn: time // in sec.
		});

		console.log("Token Created => " , signedToken);
		return signedToken;
	}


	static async resetPassword(email, pass) {
		let error = null;
		let found = null;
		let result = null;
		try{
			result = await userRepository.updateOne({'email': email}, { 'pass': pass});

			if(result.success) {
				found = true;
				error = null;
				result = result.result;
			}else {
				found = false;
				error = "Password not updated";
				result = result.result;
			}
			
		} catch(err) {
			console.log("Exception in AuthService resetPassword() => ", err);
			error = err;
			found = false;
			result = result.result;
		}

		return {
			success: found,
			error: error,
			result: result
		};
	}
};
