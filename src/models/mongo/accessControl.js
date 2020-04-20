const mongoService = require('../../services/MongoService');

const mongoose = mongoService.getClient();

const schema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    user_unique_id: {type: String, index: true },
    ui_routes: [{
        path: String,
        permissions: {
            read: { type: Boolean, default: false},
            write: { type: Boolean, default: false},
            update: { type: Boolean, default: false}
        }
    }],
    apis: [{
        api: String,
        permissions: {
            read: { type: Boolean, default: false},
            write: { type: Boolean, default: false},
            update: { type: Boolean, default: false}
        }
    }],
    updated_at: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
    }
});

module.exports = mongoose.model('access_control', schema);
