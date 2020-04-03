const mongoService = require('../../services/MongoService');

const mongoose = mongoService.getClient();

const schema = new mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	product_id: String,
	product_type: String,
	cost: Number,
	sizes: [],
	colors: []
});


module.exports = mongoose.model('Products', schema);