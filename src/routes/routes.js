const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{

	res.send("Welcome to HOme Page");

});








router.use((req, res, next) => {
	res.status(404).send('Content Not Found');
});


module.exports = router;