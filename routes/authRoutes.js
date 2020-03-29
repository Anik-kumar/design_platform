const express = require('express');
const router = express.Router();

router.get('/ink', (req, res, next) => {
	console.log(' This is auth routes /ink');
	res.send('AUth Route');

});

module.exports = router;