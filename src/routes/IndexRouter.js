const express = require('express');
const router = express.Router();
const loggingService = require('../services/LoggingService');

router.get('/', (req, res)=> {
    loggingService.getDefaultLogger().info('Reached Index route');
    res.send("Welcome to HOme Page");


});








router.use((req, res, next) => {
    res.status(404).send('Content Not Found');
});


module.exports = router;
