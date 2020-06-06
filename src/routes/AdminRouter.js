'use strict'

const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const _ = require('lodash');

const loggerService = require('../services/LoggingService');
const userService = require('../services/UserService');
const designService = require('../services/DesignService');
let {ResUserModel} = require('../models/response/response.models');



// not done 
router.post('/create', async function(req, res, next) {
	let response = {};

	const regSchema = Joi.object({
		email: Joi.string().trim().email().required(),
		firstName: Joi.string().trim().min(3).max(20).required(),
		lastName: Joi.string().trim().min(3).max(20).required(),
		pass: Joi.string().trim().min(3).required(),
		phone: Joi.string().trim().min(3).required(),
		gender: Joi.string().trim().required(),
		dob: Joi.date().required(),
		userType: Joi.string().required()
	});

	try{
		// form data validation
		await regSchema.validateAsync(req.body);

		// generating verification email template
		try {
			let tmpEmail = req.body.email;
			let tmpName = req.body.firstName + " " + req.body.lastName;
			let emailVerifyToken = await jwtService.signHS256({'email': tmpEmail}, {'expiresIn': 10*60});
			let link = "http://localhost:4200/verify-email?lang=en&token=";
			if (emailVerifyToken.auth == true) {
				link += emailVerifyToken.token;
			}
			console.log(link);


			try {
				let data = await fileService.read('./src/email/signup-email.html');
				let result = data.replace(/CONFIRM_URL/g, link);
				result = result.replace(/USER_NAME/g, tmpName);
				emailService.prepareToSendEmail(req.body.email, 'Welcome To Design Platform', result, 'Design Platform');
			} catch(err) {
				console.log("File Reading Error " , err);
			}
		} catch(err) {
			console.log(err);
		}

		req.body['unique_id'] = uuid();
		req.body['pass'] = await bcrypt.hash(req.body['pass'], saltRounds);
		// registering user
		result = await userService.signup(req.body);
		if(result.success) {
			response = result.data;
		}
		res.status(200);
	}catch(err) {
		console.error(err);
		response = {
			"error": true,
			"message": err.message
		}
		res.status(400);
	}
	res.send(response);
});


router.get('/get-all', async (req, res, next) => {
  let response = {};
  console.log("getdesigns => ", req.user_id);
  if(_.isNil(req.user_id)) {
    return res.status(401).send({
      message: "Unauthorized Access"
    });
  }
  try{
    const result = await userService.getDesigns(req.user_id);
    console.log('Get Design Result', result);
    if(result.success && !_.isNil(result.error)) {
      response.data = result.data;
      response.message = "User designs is retrived";
      response.error = null;
      response.success = true;
    }else {
      response.data = result.data;
      response.message = "User designs is NOT retrived";
      response.error = "Error in getDesignsRouter";
      response.success = false;
    }
    res.status(200);
  } catch(error) {
    console.log("Exception error in UserRouter /get-designs. ", error);
    response.message = "Exception error in /get-designs";
    response.error = error;
    response.success = false;
  }

  return res.send(response);

});




module.exports = router;