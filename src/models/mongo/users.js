const mongoService = require('../../services/MongoService');

const mongoose = mongoService.getClient();
let UserModel = require('../user.model');
/**
 * Model class to hold User Information
 * */


var schema = new mongoose.Schema(UserModel);

module.exports = mongoose.model('User', schema);
