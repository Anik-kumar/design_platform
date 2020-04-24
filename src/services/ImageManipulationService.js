var Jimp = require('jimp');
var path = require('path');
const uuidv4 = require('uuid/v4');

async function createThumbs(file) {
    return new Promise((resolve, reject) => {
        Jimp.read(file.path).then(lenna => {
            let fileName = uuidv4() + path.extname(file.originalname);
            var result = lenna.resize(256, 256).write(process.env.ROOT_PATH + 'tmp/' + fileName); // save
            resolve(result);
        }).catch(err => {
            console.error(err);
            throw error;
        });
    }).catch(error => {
        console.log(error);
        throw error;
    });

}

module.exports = {
    createThumbs: createThumbs
}
