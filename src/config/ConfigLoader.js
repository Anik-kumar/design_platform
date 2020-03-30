var config = require('config');

/**
 * Wrapper class to wrap node-config.
 * Just to make sure application doesn't have to be modified
 * if node-config library is replaced with an alternative
 * */
class ConfigLoader {
    constructor() {

    }

    /**
     * Function to check if the value exists.
     * return true if exists, false otherwise
     * */
    hasValue(key) {
        return config.has(key);
    }

    /**
     * Function to get the value fro key
     * */
    get(key) {
        return config.get(key);
    }
}

module.exports = ConfigLoader;
