const session = require('express-session');
const ConfigLoader = require('../config/ConfigLoader');
const JwtService = require('../services/JwtService');
const _ = require('lodash');
const config = new ConfigLoader();


class AuthService {
	constructor() {
		this.sessionStore = new session.MemoryStore();
	}
	getSessionStore() {
		return this.sessionStore;
	}

	async isAuthorized(req, res) {
		let response = false;
		try {
			if(_.isNil(req.header.authorization) || _.isEmpty(req.header.authorization)) {
				return response;
			}
			let token = req.header.authorization.slice(7);
			let verified = await JwtService.verify(token);
			response = true;
			console.log('verified: ', verified);
		} catch (ex) {

		}
		return response;
	}

}

const authService = new AuthService();

module.exports = authService;
