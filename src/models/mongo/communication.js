const mongoService = require('../../services/MongoService');

const mongoose = mongoService.getClient();

const schema = new mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	from_user_id: { type: String, index: true, required: true },
	to_user_id: { type: String, index: true, required: true },
  context_id: { type: String, index: true, required: true },
  context_details: String,
  comment: String,
  timestamp: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Communication', schema);
