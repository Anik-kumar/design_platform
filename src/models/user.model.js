var UserModel = {
	unique_id: String,
	email: String,
	name: {
		first: String,
		last: String
	},
	pass: String,
	phone: String,
	gender: String,
	user_type: {
		name: String,
		description: String
	},
	DOB: Date,
	address: {
		house: Number,
		street: String,
		police_station: String,
		postal_code: Number,
		city: String,
	},
	role: [],
	acl: [],
	avatar: String,
	cover_photo: String,
	reward_points: Number,
	verification: {
		email: {
			verified: { type: Boolean, default: false},
			email_sent: Boolean
		},
		phone: {
			verified: { type: Boolean, default: false},
			code_sent: { type: Boolean, default: false},
			codes: []
		},
		is_reset_pass_active: { type: Boolean, default: false}
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
	is_verified: { type: Boolean, default: false},
	is_deleted: { type: Boolean, default: false},
	date_created: Date,
	last_login: Date,
	updated_at: {
		type: Date,
		// `Date.now()` returns the current unix timestamp as a number
		default: Date.now
	}
};

module.exports = UserModel;
