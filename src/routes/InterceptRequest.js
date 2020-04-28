const cls = require('continuation-local-storage');
const uuidv4 = require('uuid/v4');
const _ = require('lodash');
const jwtService = require('../services/JwtService');
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
        console.log('---- InterceptRequest ----', req.headers.authorization );
        
        let token = req.headers['authorization'] || null;
        if(!_.isNil(token)) {
            token = token.replace('Bearer ', '');
            try {
                let result = jwtService.verifySync(token);
                if(!_.isNil(result) && !_.isNil(result.data)){
                    req['user_id'] = result.data.unique_id;
                    console.log('Interceptor -> user_id ', req['user_id']);
                }
                // jwtService.verify(token).then(result => {
                //     if(!_.isNil(result) && !_.isNil(result.data)){
                //         req['user_id'] = result.data.unique_id;
                //         console.log('Interceptor -> user_id ', req['user_id']);
                //     }
                // }).catch(error => {
                //     console.log(error);
                // })
                
            } catch(err) {
                console.log("Token verification failed ->", err);
            }
            
        }
        
        if(req.mauth && req.mauth.grant && req.mauth.grant.access_token) {
            smsApp.set("USER_ID", req.mauth.grant.content.userid);
        }
        smsApp.set('ID', uuidv4());
        next();
    });
}

module.exports = InterceptRequest;
