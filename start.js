/**
 * Build script
 * Run webpack according to https://webpack.github.io/docs/node.js-api.html
 * Run nodemon according to https://github.com/remy/nodemon/blob/master/doc/requireable.md
 * Probably don't need nodemon and could manually restart when webpack builds. Something to look into
 **/
var webpack = require('webpack');
var forever = require('forever');
var webpackConfig = require('./webpack.config');

var foreverIndex = null;
function buildComplete(err, stats) {
	console.log('Build complete');
	if(foreverIndex !== null) {
		console.log('Stopping server');
		console.log(forever.stopAll(true));
	}
	console.log(stats.toString({
		colors: true,
		minimal: true
	}));
	if(!stats.hasError) {
		console.log('Start server');
		const eventEmitter = forever.start('build/start.js', {});
		eventEmitter.on('error', function(err) { console.error(err); });
		eventEmitter.on('start', function(process, data) { console.log(process); console.log(data); });
	}
}

console.log('Start build');

var compiler = webpack(webpackConfig);

compiler.run(buildComplete);

console.log('Watching for changes');
compiler.watch({
	aggregateTimeout: 300,
	poll: false
}, buildComplete);



