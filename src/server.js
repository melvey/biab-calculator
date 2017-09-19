import path from 'path';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import flash from 'req-flash';
import React from 'react';
import ReactDomServer from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import {Provider} from 'react-redux';
import localAuth from './lib/localAuth';
import preloadStore from './loaders/server/preloadStore';
import indexTemplate from './views/index.jade';
import userMiddleware from './api/user';
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
	secret: 'youcanthandlemysecrets',
	resave: false,
	saveUninitialized: false,
	cookie: {}
}));

// passport authentication
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(localAuth);
passport.serializeUser((user, done) => done(null, JSON.stringify({username: user.username, email: user.email}), null));
passport.deserializeUser((user, done) => done(null, JSON.parse(user)));
app.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login', failureFlash: true}));

app.use('/api/user', userMiddleware);
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
			console.log("User", req.user);
			const store = preloadStore(renderProps, req);

			const routerContext = <Provider store={store}><RouterContext {...renderProps} /></Provider>;

			const contentHtml = ReactDomServer.renderToString(routerContext);

			const variables = {...config, content: contentHtml};
			console.log(html);
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
