const session = require('express-session');
const ConfigLoader = require('../config/ConfigLoader');
const jwtService = require('../services/JwtService');
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

		}
		return response;
	}

	static async getToken(user, pass) {
		var user = { user, pass };
		const token = jwt.sign({user}, config.secret);

		console.log("Token Created => " , token);
		return token;
	}

	static async getTokenWithExpireTime(user, pass, time) {
		if (time == null || time == undefined) {
			time = config.tokenExpiryTime;
		}
		// var user = { user, pass };
		// const token = jwt.sign({user}, config.secret, {
		// 	expiresIn: time // in sec.
		// });

		let signedToken = await jwtService.sign({
			email: user,
			pass: pass
		}, {
			expiresIn: time // in sec.
		});

		console.log("Token Created => " , signedToken);
		return signedToken;
	}

};
