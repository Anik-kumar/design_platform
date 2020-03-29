const loggingService = require('./LoggingService');
module.exports = class SessionService {
	constructor() {
		this.logger = loggingService.getDefaultLogger();
	}

	getUserName(req) {
		let userName = undefined;
		try {
			userName = req.auth.grant.username;
		} catch (ex) {
			this.logger.error('[SessionService]-ERROR: Exception at getUserName', JSON.stringify(ex));
		}
		return userName;
	}
};