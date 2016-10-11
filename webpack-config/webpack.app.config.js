var merge = require('lodash.merge');
var BaseConfig = require('./webpack.base.config');

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
//        sources.push('webpack-dev-server/client?http://localhost:5000');
        sources.push('webpack/hot/only-dev-server');
    }

    return sources;
}

var AppTemplate = {
	entry: getEntrySources(['babel-polyfill', './src/app.js']),
    output: {
        publicPath: '/',
				path: 'build/public',
        filename: 'app.js'
    },
    devtool: 'eval',
	module: {
		loaders: [
            {
                test: /\.scss$/,
                include: /src/,
                loaders: [
                    'style',
                    'css',
                    'autoprefixer?browsers=last 3 versions',
                    'sass?outputStyle=expanded'
                ]
            }
		]
	}
};

var appConfig = merge({}, BaseConfig, AppTemplate);
appConfig.module.loaders = BaseConfig.module.loaders.concat(AppTemplate.module.loaders);

module.exports = appConfig;
