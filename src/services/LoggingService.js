/**
 * Logging Service class to abstract logger calls
 * */
const fs = require('fs');
const path = require('path');
const winston = require('winston');
const _ = require('lodash');

class LoggingService {
	constructor() {

	}

	initializeKeys() {
		this.keys = {
			tag: 'tag',
			sessionId: 'sessionId',
			correlationId: 'correlationId',
			logType: 'logType',
			endpoint: 'endpoint',
			dbName: 'dbName',
			dbCollection: 'dbCollection',
			method: 'method',
			methodArgs: 'methodArgs',
			errorType: 'errorType'
		};
	}

	initialize() {
		this.initializeKeys();
		const maskFormat = winston.format(meta => {
			meta[this.keys.tag] = 'Listener';
			return meta;
		})();

		// Initialise multiple loggers
		this.logger = winston.createLogger({
			level: 'info',
			format: winston.format.combine(maskFormat, winston.format.json()),
			transports: [
				new winston.transports.File( { filename: 'error.log', level: 'error', 'timestamp': true}),
				new winston.transports.File( { filename: 'error.log', level: 'error', 'timestamp': true})
			]
		});

		if(process.env.NODE_ENV !== 'production') {
			this.logger.add(new winston.transports.Console({
				format: winston.format.simple()
			}, { 'timestamp': true}));
		}
	}

	getDefaultLogger() {
		return this.logger;
	}

	error(errorObj) {
		try {
			let message = '[Timestamp: ' + (new Date().toISOString()) + '] ';
			if (!_.isNil(errorObj.message)) {
				message = errorObj.message;
			}
			if (!_.isNil(errorObj.error) && errorObj.error instanceof Error) {
				message += errorObj.error.message;
				if (!_.isNil(errorObj.error.stack)) {
					message += errorObj.error.stack;
				}
			}
			this.logger.error(message);
		} catch (e) {
			console.log('Error in Logging, ', e);
		}
	}
	info(message) {
		this.logger.info('[Timestamp: ' + (new Date().toISOString()) + '] ' + message);
	}

}

const loggingService = new LoggingService;
loggingService.initialize();

module.exports = loggingService;
