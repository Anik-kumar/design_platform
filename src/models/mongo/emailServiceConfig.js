const mongoService = require('../../services/MongoService');

const mongoose = mongoService.getClient();

const schema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    service_name: { type: String, index: true },
    daily_limit: Number,
    monthly_limit: Number,
    api_key: String
});

module.exports = mongoose.model('email_service_config', schema);
//    db.emailServiceConfig.createIndex({ date: 1, service_name: 1 })
