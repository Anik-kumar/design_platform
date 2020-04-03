const mongoService = require('../../services/MongoService');

const mongoose = mongoService.getClient();

/**
 * Model class to hold User Information
 * */

var schema = new mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	name: String,
	description: String,

});

module.exports = mongoose.model('UserType', schema);
