var ServerConfig = require('./webpack.server.config');
var nodeExternals = require('webpack-node-externals');

var testConfig = Object.assign({}, ServerConfig);

testConfig.entry = undefined;
testConfig.output = undefined;
testConfig.target = 'node';
testConfig.externals = [nodeExternals()];

module.exports = testConfig;

