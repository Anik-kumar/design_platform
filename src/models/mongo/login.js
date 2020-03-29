const mongoService = require('../../services/MongoService');

const mongoose = mongoService.getClient();

const schema = new mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	user_mail: String,
	user_pass: String,
});


module.exports = mongoose.model('Login', schema);