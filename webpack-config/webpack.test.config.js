var path = require('path');
var ServerConfig = require('./webpack.server.config');
var nodeExternals = require('webpack-node-externals');
var glob = require('glob');

var testConfig = Object.assign({}, ServerConfig);

testConfig.entry = undefined;

testConfig.output = undefined;
testConfig.target = 'node';
testConfig.externals = [nodeExternals()];
console.log(glob.sync('./test/*.js'));
testConfig.entry = glob.sync('./test/*.js');
testConfig.output = {
	path: path.join(__dirname, '../tmp'),
	filename: 'tests.js'
};

module.exports = testConfig;
