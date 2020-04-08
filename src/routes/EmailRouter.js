const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Joi = require('@hapi/joi');

const loggerService = require('../services/LoggingService');
const emailConfigService = require('../services/email/EmailConfigService');
const emailCountService = require('../services/email/EmailCountService');
const emailService = require('../services/email/EmailService');
const sendinBlueService = require('../services/email/SendinBlueService');


/**
 * This API retrieves all email sender's configurations
 * @route GET /config
 * @group Email Configuration - Operations about email config
 * @returns {object} 200 - An array of configurations
 * @returns {Error}  default - Unexpected error
 */
router.get('/config', async (req, res, next) => {
    let response = {};
    try {
        let result = await emailConfigService.getAllConfig();
        console.log('emailConfigService: ', result);
        if(result.success === false ) {
            loggerService.getDefaultLogger().error('[ROUTE]-[USER]-ERROR: Query Failed at /email/config route: ');
        } else {
            response = result.data;
        }
    } catch (ex) {
        loggerService.getDefaultLogger().error('[ROUTE]-[INDEX]-ERROR: Exception get request at /email/config route: ' + JSON.stringify(ex));
    }
    res.send(response);
});

/**
 * This API retrieves the number of emails sent by all services
 * @route GET /count
 * @group Email Count - Operations about email count
 * @returns {object} 200 - An array of configurations
 * @returns {Error}  default - Unexpected error
 */
router.get('/count', async (req, res, next) => {
    let response = {};
    try {
        let result = await emailCountService.getAll();
        if(result.success === false ) {
            loggerService.getDefaultLogger().error('[ROUTE]-[USER]-ERROR: Query Failed at /email/count route: ');
        } else {
            response = result.data;
        }

    } catch (ex) {
        loggerService.getDefaultLogger().error('[ROUTE]-[INDEX]-ERROR: Exception get request at /email/count route: ' + JSON.stringify(ex));
    }
    res.send(response);
});

/**
 * This API retrieves the number of emails sent by all services today
 * @route GET /count/today
 * @group Email Count - Operations about email count
 * @returns {object} 200 - An array of configurations
 * @returns {Error}  default - Unexpected error
 */
router.get('/count/today', async (req, res, next) => {
    let response = {};
    try {
        let result = await emailCountService.getTodaysEmailCount();
        if(result.success === false ) {
            loggerService.getDefaultLogger().error('[ROUTE]-[USER]-ERROR: Query Failed at /email/count route: ');
        } else {
            response = result.data;
        }

    } catch (ex) {
        loggerService.getDefaultLogger().error('[ROUTE]-[INDEX]-ERROR: Exception get request at /email/count route: ' + JSON.stringify(ex));
    }
    res.send(response);
});


/**
 * This API updates email sent count
 * @route POST /count/today
 * @group Email Count - Operations about email count
 * @param {string} service.query.required - email sending service provider name
 * @returns {object} 200 - An array of configurations
 * @returns {Error}  default - Unexpected error
 */
router.post('/update_count', async (req, res, next) => {
    let response = {};
    try {
        let service = req.body.service;
        let result = await emailCountService.updateEmailCountByService(service);
        if(result.success === false ) {
            loggerService.getDefaultLogger().error('[ROUTE]-[USER]-ERROR: Query Failed at /email/count route: ');
        } else {
            response = result.data;
        }

    } catch (ex) {
        loggerService.getDefaultLogger().error('[ROUTE]-[INDEX]-ERROR: Exception get request at /email/count route: ' + JSON.stringify(ex));
    }
    res.send(response);
});

router.post('/send', async (req, res, next) => {
    let response = {};
    try {
        const emailSchema = Joi.object({
            to: Joi.string().trim().email().required(),
            name: Joi.string().trim().required(),
            content: Joi.string().trim().required(),
            subject: Joi.string().trim().required(),
        });

        try{
            await emailSchema.validateAsync(req.body);
            response = await emailService.prepareToSendEmail(req.body.to, req.body.subject, req.body.content, req.body.name);
            
            let emailsToday = await emailCountService.getTodaysEmailCount();
            res.status(200);
        }catch(err) {
            console.error(err);
            response = {
                "error": true,
                "message": err.message
            }
            res.status(400);
        }
    } catch (ex) {
        loggerService.getDefaultLogger().error('[ROUTE]-[INDEX]-ERROR: Exception get request at /email/count route: ' + JSON.stringify(ex));
    }
    res.send(response);
});


router.post('/sendsib', async (req, res, next) => {
    let response = {};
    try {
        const emailSchema = Joi.object({
            to: Joi.string().trim().email().required(),
            name: Joi.string().trim().required(),
            content: Joi.string().trim().required(),
            subject: Joi.string().trim().required(),
        });

        try{
            await emailSchema.validateAsync(req.body);
            response = await sendinBlueService.sendEmail(req.body.to, req.body.subject, req.body.content, req.body.name);
            res.status(200);
        }catch(err) {
            console.error(err);
            response = {
                "error": true,
                "message": err.message
            }
            res.status(400);
        }
    } catch (ex) {
        loggerService.getDefaultLogger().error('[ROUTE]-[INDEX]-ERROR: Exception get request at /email/sendsib route: ' + (ex.message || ''));
    }
    res.send(response);
});
module.exports = router;
