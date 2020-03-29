const cls = require('continuation-local-storage');
const uuidv4 = require('uuid/v4');
const ConfigLoader = require('../config/ConfigLoader');
const config = new ConfigLoader();

let smsApp = cls.createNamespace(config.get('localStorage.name'));
/**
 * Middleware function to intercept request
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * */

function InterceptRequest(req, res, next) {
    smsApp.bindEmitter(req);
    smsApp.bindEmitter(res);
    smsApp.run(() => {
        if(req.mauth && req.mauth.grant && req.mauth.grant.access_token) {
            smsApp.set("USER_ID", req.mauth.grant.content.userid);
        }
        smsApp.set('ID', uuidv4());
        next();
    });
}

module.exports = InterceptRequest;
