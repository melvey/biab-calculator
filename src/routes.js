import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import Index from './components/Index';
import About from './components/About';
import NotFound from './components/NotFound';

const router = (
	<Route path="/" component={App}>
		<IndexRoute component={Index} />
		<Route path="about" component={About} />
		<Route path="*" component={NotFound} />
	</Route>
);

export default router;
