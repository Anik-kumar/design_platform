const mongoService = require('../../services/MongoService');

const mongoose = mongoService.getClient();

/**
 * Model class to hold User Information
 * */

var schema = new mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	unique_id: String,
	email: String,
	name: {
		first: String,
		last: String
	},
	pass: String,
	phone: String,
	gender: String,
	user_type: String,
	DOB: Date,
	address: {
		house: Number,
		street: String,
		police_station: String,
		postal_code: Number,
		city: String,
	},
	role: [],
	avatar: String,
	cover_photo: String,
	reward_points: Number,
	verification: {
		email: {
			verified: Boolean,
			code: String
		},
		phone: {
			verified: Boolean,
			code: String
		},
		reset_pass: {
			verified: Boolean,
			code: String
		}
	},
	social_profiles: {
		fb: {
			link: String,
			logo: String
		},
		linkedin: {
			link: String,
			logo: String
		},
		google: {
			link: String,
			logo: String
		},
		slack: {
			link: String,
			logo: String
		},
		vk: {
			link: String,
			logo: String
		},
		instagram: {
			link: String,
			logo: String
		},
		twitter: {
			link: String,
			logo: String
		},
		flickr: {
			link: String,
			logo: String
		},
		thumblr: {
			link: String,
			logo: String
		},
		youtube: {
			link: String,
			logo: String
		},
		skype: {
			link: String,
			logo: String
		},
		discord: {
			link: String,
			logo: String
		},
		pinterest: {
			link: String,
			logo: String
		},
		viber: {
			link: String,
			logo: String
		},
		behance: {
			link: String,
			logo: String
		},
		telegram: {
			link: String,
			logo: String
		},
	},
	is_verified: Boolean,
	is_deleted: Boolean,
	date_created: Date,
	last_login: Date
});

module.exports = mongoose.model('User', schema);
