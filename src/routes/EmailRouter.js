const express = require('express');
const router = express.Router();
const _ = require('lodash');

const loggerService = require('../services/LoggingService');
const emailConfigService = require('../services/email/EmailConfigService');
const emailCountService = require('../services/email/EmailCountService');
const emailService = require('../services/email/EmailService');

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
        let emailTo = req.body.to || "";
        let from = req.body.from || "info@pijus.me";
        let content = req.body.content;

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




module.exports = router;
