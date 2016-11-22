import path from 'path';
import express from 'express';
import React from 'react';
import ReactDomServer from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import {Provider} from 'react-redux';
import store from './redux/store';
import indexTemplate from './views/index.jade';
import grainMiddleware from './api/grain';
import hopsMiddleware from './api/hops';
import yeastMiddleware from './api/yeast';
import routes from './routes';

const status = {
	error: 500,
	redirect: 302,
	success: 200,
	notFound: 404
};
const defaultPort = 5000;


// Data to send to jade template
const config = {
	scripts: ['/app.js']
};

const app = express();
const port = process.env.PORT || defaultPort;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/grain', grainMiddleware);
app.use('/api/hops', hopsMiddleware);
app.use('/api/yeast', yeastMiddleware);

app.use('*', async (req, res) => {
	// res.render doesn't seem to work with webkit so we use webkit to load the jade template and render it here
	match({routes, location: req.baseUrl || req.url}, (error, redirectLocation, renderProps) => {
		if(error) {
			res.status(status.error).send(error.message);
		} else if(redirectLocation) {
			res.redirect(status.redirect, redirectLocation.pathname + redirectLocation.search);
		} else if(renderProps) {

			const routerContext = <Provider store={store}><RouterContext {...renderProps} /></Provider>;

			const contentHtml = ReactDomServer.renderToString(routerContext);

			const variables = {...config, content: contentHtml};
			const html = indexTemplate(variables);
			res.status(status.success).send(html);
		} else {
			res.status(status.notFound).send('Not Found');
		}
	});
});

app.listen(port, () => {
	/*eslint-disable no-console*/
	console.log(`Listening on ${port}`);
});
