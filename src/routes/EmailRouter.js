const express = require('express');
const router = express.Router();
const _ = require('lodash');

const loggerService = require('../services/LoggingService');
const emailConfigService = require('../services/email/EmailConfigService');
const emailCountService = require('../services/email/EmailCountService');
const emailService = require('../services/email/EmailService');

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
