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
				let expiresIn = options['expiresIn'] || 960;
				if (_.isNil(sOptions) || _.isEmpty(sOptions)) {
					sOptions = {
						issuer: "pijus.me",
						subject: "admin@pijus.me",
						audience: "Client_Identity" // this should be provided by client
					}
				}
					// Token signing options
				var signOptions = {
					issuer:  sOptions.issuer,
					subject:  sOptions.subject,
					audience:  sOptions.audience,
					expiresIn:  expiresIn,    // 30 days validity
					algorithm:  "RS256"
				};
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
					expiresIn:  960,
					algorithm:  ["RS256"]
				};

				var verifiedToken = jwt.verify(token, privateKEY, verifyOptions,  (err, decoded) => {
					if(err) {
						loggingService.getDefaultLogger().error('[JwtService]-ERROR: Error at verify(): ' + JSON.stringify(err));
						reject(err);
					}
					resolve({
						data: decoded,
						token: token
					});
				});
			} catch (ex) {
				loggingService.getDefaultLogger().error('[JwtService]-ERROR: Exception at sign(): ' + JSON.stringify(ex));
				reject(ex);
			}
		});
	}


};
