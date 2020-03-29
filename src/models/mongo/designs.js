const mongoService = require('../../services/MongoService');

const mongoose = mongoService.getClient();

const schema = new mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	design_name: String,
	design_photos: [],
	likes: Number,
	comment: [{
		user_uuid: String,
		text: String
	}],
	votes: Number,
	tags: []
});


module.exports = mongoose.model('Designs', schema);