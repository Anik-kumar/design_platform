const mongoService = require('../../services/MongoService');
const { number } = require('joi');

const mongoose = mongoService.getClient();

const schema = new mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	user_unique_id: { type: String, index: true, required: true },
	design_id: { type: String, index: true, required: true },
	title: { type: String, index: true, required: true },
	title_path: {type: String, index: true, required: true},
	description: String,
	type: { type: String, required: true },
	raw_design: {
		title: String,
		file_size: Number,
		public_url: { type: String, required: true },
		description: String,
		likes: Number,
		tag: [],
		key: String,
		aws_name: String,
		reviewer: {
			id: { type: String, index: true },
			user_type: Number
		},
		reviewed_by: {
			user: String,
			date: { type: Date}
		},
		approved_by: {
			user: String,
			date: { type: Date}
		},
		rejected_by: {
			user: String,
			date: { type: Date}
		}
	},
	photos: [{
		title: String,
		file_size: Number,
		public_url: String,
		description: String,
		likes: Number,
		tag: [],
		key: String,
		aws_name: String
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
	},
	year_month_index: { type: String, index: true}, //2020-01
	whereami: {
		current_state: String,
		previous_state: String
	}
});

module.exports = mongoose.model('Design', schema);
