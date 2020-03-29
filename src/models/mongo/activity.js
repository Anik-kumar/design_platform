const mongoService = require('../../services/MongoService');

const mongoose = mongoService.getClient();

const schema = new mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	uuid: String,
	action: [],
	time: time
});


module.exports = mongoose.model('Activities', schema);