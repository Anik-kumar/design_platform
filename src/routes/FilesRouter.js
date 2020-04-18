const express = require('express');
const router = express.Router();
const loggingService = require('../services/LoggingService');
const upload = require('./upload');


router.post('/upload', upload);

router.post('/upload_design', async function(req, res, next) {
	let response = {};
	try {
		

		const form = new IncomingForm();

  form.on('file', (field, file) => {
    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path
    console.log('file', file.name);
    const readStream = fs.createReadStream(file.path);
  });
  form.on('end', () => {
    res.json();
  });
  form.parse(req);

	} catch (ex) {
		console.log(ex);
		loggerService.getDefaultLogger().error('[ROUTE]-[INDEX]-ERROR: Exception get request at /auth/login route: ' + JSON.stringify(ex));
	}

	res.send(response);
});




module.exports = router;
