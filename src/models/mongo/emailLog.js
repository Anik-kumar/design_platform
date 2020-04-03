const mongoService = require('../../services/MongoService');

const mongoose = mongoService.getClient();

const schema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    sentTo: String,
    sendBy: String,
    subject: String,
    content: String,
    timestamp: Date
});

module.exports = mongoose.model('email_log', schema);
//    db.emailServiceConfig.createIndex({ date: 1, service_name: 1 })
