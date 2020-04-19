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


module.exports = router;