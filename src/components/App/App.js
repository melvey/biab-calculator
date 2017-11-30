import React, {Component, PropTypes} from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from '../../containers/HeaderContainer';
import Index from '../Index';
import About from '../About';
import Login from '../Login';
import Signup from '../Signup';
import NotFound from '../NotFound';

import styles from './App.scss';

class App extends Component {

	constructor() {
		super();

	}

  static propTypes = {
  };

  render() {
	return (
		<div>
			<Header />
			<Switch>
				<Route path="/about" component={About} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route exact path="/" component={Index} />
				<Route path="*" component={NotFound} />
			</Switch>
		</div>
	);
  }

}

export default App;
