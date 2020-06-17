const mongoService = require('../../services/MongoService');

const mongoose = mongoService.getClient();

const schema = new mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	user_id: { type: String, index: true, required: true },
	description: { type: String, required: true },
	more: [],
	ix_date: { type: Date, index: true, required: true }, // '2020-06-03'
	ix_month: { type: Number, index: true, required: true}, // 1,2,3.....12
	ix_time: { type: Number, index: true, required: true }, // hr => 20
	date_created: {
		type: Date,
		default: Date.now
	}
});

/**
 * Activities in last 
 * - 30 min
 * - 1 hr
 * - 4 hr
 * - 6 hr
 * - 8 hr
 * - 12 hr
 * - 24 hr
 * - 2 days
 * -
 */


module.exports = mongoose.model('activity', schema);