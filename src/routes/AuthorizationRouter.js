const express = require('express');
const router = express.Router();
const {isNil, isEmpty, cloneDeep } = require('lodash');
const fs = require('fs');

const { USER_TYPE } = require('../models/user_type.enum');
const jwtService = require('../services/JwtService');
const loggerService = require('../services/LoggingService');
const authorizationService = require('../services/AuthorizationService');


router.get('/routes', async function(req, res, next) {
	let response = {};
	try {
		let token = req.headers['x-access-token'] || req.headers['authorization'];
		console.log('Token: ', token);
		if (!isNil(token)) {
			token = token.replace('Bearer ',''); 
		}
		const userData = await jwtService.verify(token);
		const user_unique_id = userData.unique_id;
		console.log('userData', userData);
		let routes = await authorizationService.getRoutes(user_unique_id);
		if (routes.success) {
			response = routes.data;
		}
	} catch (ex) {
		console.log(ex);
		loggerService.getDefaultLogger().error('[ROUTE]-[INDEX]-ERROR: Exception get request at /auth/login route: ' + JSON.stringify(ex));
	}

	res.send(response);
});

router.post('/add_routes', async function(req, res, next) {
	let response = {};
	try {
		let token = req.headers['x-access-token'] || req.headers['authorization'];
		console.log('Token: ', token);
		if (!isNil(token)) {
			token = token.replace('Bearer ',''); 
		}
		const userData = await jwtService.verify(token);
		const user_unique_id = userData.data.unique_id;

		let routes = await authorizationService.addRoutes(user_unique_id, req.body);
		if (routes.success) {
			response = routes.data;
		}
	} catch (ex) {
		console.log(ex);
		loggerService.getDefaultLogger().error('[ROUTE]-[INDEX]-ERROR: Exception get request at /auth/login route: ' + JSON.stringify(ex));
	}

	res.send(response);
});

router.get('/navigations', async function(req, res, next) {
	let response = {};
	try {
		let token = req.headers['x-access-token'] || req.headers['authorization'];
		console.log('Token: ', token);
		if (!isNil(token)) {
			token = token.replace('Bearer ',''); 
			
		} else {
			return res.status(401).send({
				message: 'Unauthorized Access. Please Signin'
			});
		}
		const userData = await jwtService.verify(token);
		const user_unique_id = userData.data.unique_id;
		const user_type = userData.data.user_type;
		console.log('userData', userData);
		let routes = await authorizationService.getNavigations();
		if (routes.success) {
			response = routes.data.nav_root; 
			let nav = [];
			routes.data.base_nav.forEach((bitem) => {
				let item = null;
				if (bitem.access_level > user_type) {
					return ;
				}
				item = cloneDeep(bitem);
				item['subMenu'] = [];
				if (bitem.hasOwnProperty('subMenu') && !isEmpty(bitem.subMenu)) {
					bitem.subMenu.forEach((sm) => {
						if (sm.access_level > user_type) {
							return ;
						}
						item['subMenu'].push(sm);
					});
				}
				nav.push(item);
			});
			
			if ( user_type >= USER_TYPE.REVIEWER) {
				routes.data.admin_nav.forEach((item) => {
					let aitem = null;
					if (item.access_level > user_type) {
						return ;
					}
					aitem = cloneDeep(item);
					aitem['subMenu'] = [];
					if (item.hasOwnProperty('subMenu') && !isEmpty(item.subMenu)) {
						item.subMenu.forEach((sm) => {
							if (sm.access_level > user_type) {
								return ;
							}
							aitem['subMenu'].push(sm);
						});
					}
					nav.push(aitem);
				});
			}
			console.log('nav: ', nav);
			response[0].menu = nav;
		}
	} catch (ex) {
		console.log(ex);
		loggerService.getDefaultLogger().error('[ROUTE]-[INDEX]-ERROR: Exception get request at /auth/login route: ' + JSON.stringify(ex));
	}

	res.send(response);
});
module.exports = router;
