const mongoService = require('../../services/MongoService');

const mongoose = mongoService.getClient();

const schema = new mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	user_uuid: String,
	accounts: [{
		type: String,
		link: String
	}],
	time: time
});


module.exports = mongoose.model('SocialAccounts', schema);