import path from 'path';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import flash from 'req-flash';
import React from 'react';
import ReactDomServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import localAuth from './lib/localAuth';
import preloadStore from './loaders/server/preloadStore';
import indexTemplate from './views/index.jade';
import userMiddleware from './api/user';
import grainMiddleware from './api/grain';
import hopsMiddleware from './api/hops';
import yeastMiddleware from './api/yeast';
import recipeMiddleware from './api/recipe';
import App from './components/App';

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
passport.serializeUser((user, done) => done(null, JSON.stringify({username: user.username, email: user.email, id: user._id}), null));
passport.deserializeUser((user, done) => done(null, JSON.parse(user)));
app.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login', failureFlash: true}));

app.use('/api/user', userMiddleware);
app.use('/api/grain', grainMiddleware);
app.use('/api/hops', hopsMiddleware);
app.use('/api/yeast', yeastMiddleware);
app.use('/api/recipe', recipeMiddleware);

app.use('*', async (req, res) => {
	console.log("User", req.user);
	const store = preloadStore(req);
	const context = {};

	const routerContext = <Provider store={store}><StaticRouter location={req.url} context={context}><App/></StaticRouter></Provider>;

	if(context.url) {
		res.redirect(status.redirect, context.url);
	} else {
		const contentHtml = ReactDomServer.renderToString(routerContext);

		const variables = {...config, content: contentHtml, state: JSON.stringify(store.getState())};
		const html = indexTemplate(variables);
		res.status(status.success).send(html);
	}
});

app.listen(port, () => {
	/*eslint-disable no-console*/
	console.log(`Listening on ${port}`);
});
