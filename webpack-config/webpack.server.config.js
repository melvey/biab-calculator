var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
//var nodeExternals = require('webpack-node-externals');
var merge = require('lodash.merge');
var fs = require('fs');
var BaseConfig = require('./webpack.base.config');

// Exclude node_modules directory
function getNodeModules() {
	var nodeModules = {};
	fs.readdirSync('node_modules')
		.filter(function(x) {
			return ['.bin'].indexOf(x) === -1;
		})
		.forEach(function(mod) {
			//nodeModules[mod] = true;
			nodeModules[mod] = 'commonjs ' + mod;
		});
	return nodeModules;
}

var ServerTemplate = {
	entry: ['babel-polyfill', './src/server.js'],
	output: {
		publicPath: '/',
		path: 'build/public',
		filename: '../server.js'
	},
	target: 'node',
	node: {
		__dirname: false,
		__filename: false
	},
	externals: [getNodeModules()],
	//externals: [nodeExternals()],
	plugins: [
		new ExtractTextPlugin('style.css'),
		new CopyWebpackPlugin([
				{from: 'src/public'}
		])
	],
	module: {
		loaders: [
			{
				test: /\.scss$/,
				include: /src/,
				loader: ExtractTextPlugin.extract(
						'style',
						'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
						'autoprefixer?browsers=last 3 versions',
						'sass'
				)
			},
			{
				test: /\.jade$/,
				loader: 'jade'
			}
		]
	}
};


var serverConfig = merge({}, BaseConfig, ServerTemplate);
serverConfig.module.loaders = BaseConfig.module.loaders.concat(ServerTemplate.module.loaders);

module.exports = serverConfig;
