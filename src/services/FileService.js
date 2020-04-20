'use strict';

const path = require('path');
const fs = require('fs');
// const ABSPATH = path.dirname(process.mainModule.filename);

class Files {
    /**
     * Function to read file
     * @param {string} path - path of the file
     * @param {string} encoding - encoding format
     * @return {Promise<data>}
     */
    static async read(path, encoding = 'utf8') {
        return new Promise((resolve, reject) => {
            let readStream = fs.createReadStream(path, encoding);
            let data = '';

            readStream.on('data', chunk => {
                data += chunk;
            }).on('end', () => {
                resolve(data);
            }).on('error', err => {
                reject(err);
            });
        });
    }

    /**
     * Function to create file
     * @param {string} path - path of the file
     * @param {string} contents - file content
     * @return {Promise<data>}
     */
    static async create(path, contents) {
        return new Promise((resolve, reject) => {
            fs.writeFile( path, contents, (err, data) => {
                if(!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    }

    static async remove(path) {
        return new Promise((resolve, reject) => {
            fs.unlink( path, err => {
                if(!err) {
                    resolve(path);
                } else {
                    reject(err);
                }
            });
        });
    }

    static async exists(path) {
        return new Promise((resolve, reject) => {
            fs.access(path, fs.constants.F_OK, err => {
                if(!err) {
                    resolve(true);
                } else {
                    reject(err);
                }
            });
        });
    }
}

module.exports = Files;
