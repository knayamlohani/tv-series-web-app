const NODE_ENV = process.env.NODE_ENV

console.log('MODE', NODE_ENV)

const path = require('path');
const tvdbConfig = require('./' + NODE_ENV + '/tvdb.config.js');
const applicationConfig = require('./' + NODE_ENV + '/application.config.js');


const configs = {
    tvdbConfig,
    applicationConfig
}

module.exports = configs