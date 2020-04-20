const fs   = require('fs');
const jwt   = require('jsonwebtoken');
const _ = require('lodash');
const loggingService = require('../services/LoggingService');

// use 'utf8' to get string instead of byte array  (512 bit key)
var privateKEY  = fs.readFileSync('./cert/private.key', 'utf8');
var publicKEY  = fs.readFileSync('./cert/public.key', 'utf8');


module.exports =  class JwtService {
	constructor(){

	}

	static async sign(data, options) {
		return new Promise ((resolve, reject) => {
			try {
				let sOptions = options;
				let expiresIn = 960;

				if(_.isNil(options) && !_.isNil(options['expiresIn'])){
					expiresIn = options['expiresIn'];
				}

				if (_.isNil(sOptions) || _.isEmpty(sOptions)) {
					sOptions = {
						issuer: "pijus.me",
						subject: "admin@pijus.me",
						audience: "Client_Identity" // this should be provided by client
					}
				}
				
				//var token = jwt.sign(payload, privateKEY, signOptions);
				var token = jwt.sign(data, privateKEY, {
					issuer: "pijus.me",
					subject: "admin@pijus.me",
					audience:  'Client_Identity',
					expiresIn:  expiresIn,
					algorithm:  "RS256"
				});

				resolve({
					auth: true,
					token: token
				})
			} catch (ex) {
				loggingService.getDefaultLogger().error('[JwtService]-ERROR: Exception at sign(): ' + JSON.stringify(ex));
				reject(ex);
			}
		});
	}


	static async verify(token) {
		return new Promise ((resolve, reject) => {
			try {
				var verifyOptions = {
					issuer: "pijus.me",
					subject: "admin@pijus.me",
					audience:  'Client_Identity',
					algorithms:  ["RS256"]
				};

				var verifiedToken = jwt.verify(token, privateKEY, verifyOptions,  (err, decoded) => {
					if(err) {
						loggingService.getDefaultLogger().error('[JwtService]-ERROR: Error at verify(): ' + JSON.stringify(err));
						reject(err);
					}
					resolve({
						data: decoded,
						token: token,
						success: true
					});
				});
			} catch (ex) {
				loggingService.getDefaultLogger().error('[JwtService]-ERROR: Exception at sign(): ' + JSON.stringify(ex));
				reject(ex);
			}
		});
	}


	static async signHS256(data, options) {
		return new Promise ((resolve, reject) => {
			try {
				let sOptions = options;
				let expiresIn = options['expiresIn'] || 960;
				if (_.isNil(sOptions) || _.isEmpty(sOptions)) {
					sOptions = {
						issuer: "pijus.me",
						subject: "admin@pijus.me",
						audience: "Client_Identity" // this should be provided by client
					}
				}
				
				//var token = jwt.sign(payload, privateKEY, signOptions);
				var token = jwt.sign(data, privateKEY, {
					issuer: "pijus.me",
					subject: "admin@pijus.me",
					audience:  'Client_Identity',
					expiresIn:  expiresIn,
					algorithm:  "HS256"
				});

				resolve({
					auth: true,
					token: token
				})
			} catch (ex) {
				loggingService.getDefaultLogger().error('[JwtService]-ERROR: Exception at sign(): ' + JSON.stringify(ex));
				reject(ex);
			}
		});
	}


	static async verifyHS256(token, options) {
		return new Promise ((resolve, reject) => {
			try {
				let sOptions = options;
				let expiresIn = options['expiresIn'];
				let decoded;
				let tokenExpired;
				var verifyOptions = {
					issuer: "pijus.me",
					subject: "admin@pijus.me",
					audience:  'Client_Identity',
					expiresIn:  expiresIn,
					algorithm:  "HS256"
				};

				try {
					decoded = jwt.decode(token, {complete: true});
					console.log("Decoded => ", decoded);
					tokenExpired = decoded.payload.exp;
				} catch(err) {
					console.log(err);
				}
				
				if((Date.now() / 1000) >= tokenExpired) {
					console.log("Token is Expired");
				}

				var verifiedToken = jwt.verify(token, privateKEY, verifyOptions,  (err, decoded) => {
					if(err) {
						console.log(err);
						loggingService.getDefaultLogger().error('[JwtService]-ERROR: Error at verify(): ' + JSON.stringify(err));
						reject(err);
					}
					resolve({
						data: decoded,
						token: token,
						success: true
					});
				});
			} catch (ex) {
				console.log(ex);
				loggingService.getDefaultLogger().error('[JwtService]-ERROR: Exception at verifyHS256(): ' + JSON.stringify(ex));
				reject(ex);
			}
		});
	}


};
