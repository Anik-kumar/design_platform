const mongoService = require('../../services/MongoService');

const mongoose = mongoService.getClient();

const schema = new mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	user_unique_id: { type: String, index: true, required: true },
	design_id: { type: String, index: true, required: true },
	title: String,
	type: { type: String, required: true },
	raw_design: {
		file_name: String,
		file_size: Number,
		public_url: { type: String, required: true },
		description: String,
		title: String,
		likes: Number,
		tag: []
	},
	photos: [{
		file_name: String,
		file_size: Number,
		public_url: String,
		description: String,
		title: String,
		likes: Number,
		tag: []
	}],
	likes: Number,
	comment: [{
		user_uuid: String,
		text: String
	}],
	votes: Number,
	tags: [],
	date_created: {
		type: Date,
		// `Date.now()` returns the current unix timestamp as a number
		default: Date.now
	},
	updated_at: {
		type: Date,
		// `Date.now()` returns the current unix timestamp as a number
		default: Date.now
	}
});

module.exports = mongoose.model('Design', schema);
