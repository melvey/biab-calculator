var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: ['babel-polyfill', './src/server.js'],
	output: {
		publicPath: '/',
		path: 'build/public',
		filename: '../server.js'
	},
	target: 'node',
	externals: [nodeExternals()],
	node: {
		__dirname: false,
		__filename: false
	},
	plugins: [
		new ExtractTextPlugin('style.css')
	],
	module: {
		loaders: [
			{
				test: /\.scss$/,
				include: /src/,
				loader: ExtractTextPlugin.extract(
						'style',
						'css',
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
