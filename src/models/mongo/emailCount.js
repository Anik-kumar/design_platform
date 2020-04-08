const mongoService = require('../../services/MongoService');

const mongoose = mongoService.getClient();
const schema = new mongoose.Schema({
    date: { type: String, index: true, required: true },
    service_name: { type: String, index: true, required: true},
    total_sent: { type: Number, required: true},
    daily_limit: Number,
    monthly_limit: Number,
    priority: Number,
    updatedAt: String
});

//    db.emailCounts.createIndex({ date: 1, service_name: 1 })
module.exports = mongoose.model('email_count', schema);
