const express = require('express');
const router = express.Router();
const _ = require('lodash');


const jwtService = require('../services/JwtService');
const loggerService = require('../services/LoggingService');
const authService = require('../services/AuthService');



router.post('/verify-hs', async function(req, res, next) {
	let response = {};
	console.log(req.body);

	try{
		const result = await jwtService.verifyHS256(req.body.token, { 'expiresIn' : 10*60 });
		console.log("/verify-hs => ", result);

		if(result.success ) {
			response.message = "Token is Valid";
			response.success = true;
			response.error = null;
			response.email = result.data.email;
		}

	} catch(err) {
    console.log(err);
    if(err.message == "jwt expired") {
			response.message = "Token is expired";
			response.success = false;
			response.error = err.name || "TokenExpiredError";
			response.email = null;
    }

    if(err.message == "jwt malformed") {
      response.message = "Your token is invalid";
      response.success = false;
			response.error = err.name || "JsonWebTokenError";
			response.email = null;
    }

  }

  res.status(200);
  console.log("---> TokenRouter => ", response);
  res.send(response);

});


router.post('/verify-rs', async function(req, res, next) {
	let response = {};
	console.log(req.body);

	try{
		const result = await jwtService.verify(req.body.token, { 'expiresIn' : 10*60 });

		if(result.success ) {
			response.message = "Token is Valid";
			response.success = true;
			response.error = null;
		}

	} catch(err) {
    console.log(err);
    if(err.message == "jwt expired") {
			response.message = "Token is expired";
			response.success = false;
			response.error = err.name || "TokenExpiredError";
    }

    if(err.message == "jwt malformed") {
      response.message = "Your token is invalid";
      response.success = false;
      response.error = err.name || "JsonWebTokenError";
    }
  }

  res.status(200);
  console.log("---> TokenRouter => ", response);
  res.send(response);

});

router.post('/renew', async function(req, res, next) {
	let response = {};
	try{
		let token = req.headers['authorization'] || null;
		if(!_.isNil(token)) {
			token = token.replace('Bearer ', '');
		}

		const result = await jwtService.verify(token, { 'expiresIn' : 10*60 });
		console.log('Renew token: ', result);
		if(result.success ) {
			let token = await authService.getTokenWithExpireTime(result.data.email, result.data.unique_id, 24*60*60);
			res.set({
				'X-Auth-Token': token.token
			});
			res.status(200);
			response.message = "Renewed token";
			response.success = true;
			response.error = null;
		} else {
			res.status(401);
		}

	} catch(err) {
		console.log(err);
		if(err.message == "jwt expired") {
			response.message = "Token is expired";
			response.success = false;
			response.error = err.name || "TokenExpiredError";
		}

		if(err.message == "jwt malformed") {
			response.message = "Your token is invalid";
			response.success = false;
			response.error = err.name || "JsonWebTokenError";
		}
		res.status(401);
	}
	console.log("---> TokenRouter => ", response);
	res.send(response);

});


module.exports = router;
