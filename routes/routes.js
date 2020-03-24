const express = require('express');
const router = express.Router();

router.get('/car', (req, res)=>{

	res.send("Cars");

});




module.exports = router;