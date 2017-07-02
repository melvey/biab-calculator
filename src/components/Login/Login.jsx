import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import styles from './Login.scss';

class Login extends Component {

	static propTypes = {
		className: PropTypes.string
	};

	constructor(props) {
		super();

		this.props = props;
		this.state = {};
	}

	render() {
		const ids = {
			username: 'login_form_username',
			password: 'login_form_password',
		};

		return (
			<form className={styles.form} method="post" action="/login">
				<div className={styles.header}>
					<h2>Log in</h2>
					<p>
						<span>Or </span>
						<Link to="/signup">create a new account</Link>
					</p>
				</div>
				<label htmlFor={ids.username}>Username</label>
				<input type="text" id={ids.username} name="username" />
				<label htmlFor={ids.password}>Password</label>
				<input type="password" id={ids.password} name="password" />
				<button className={styles.submit} type="submit">Sign up</button>
			</form>
		);
	}

}

export default Login;
