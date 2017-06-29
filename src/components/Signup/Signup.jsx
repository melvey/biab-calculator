import React, {Component, PropTypes} from 'react';
import styles from './Signup.scss';

class Signup extends Component {

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
			username: 'signup_form_username',
			email: 'signup_form_email',
			password: 'signup_form_password',
			confirmPassword: 'signup_form_confirm_password'
		};

		return (
			<form className={styles.form}>
				<div className={styles.header}>
					<h2>Sign Up</h2>
					<p>Create a new account</p>
				</div>
				<label htmlFor={ids.username}>Username</label>
				<input type="text" id={ids.username} />
				<label htmlFor={ids.email}>Email</label>
				<input type="text" id={ids.email} />
				<label htmlFor={ids.password}>Password</label>
				<input type="password" id={ids.password} />
				<label htmlFor={ids.confirmPassword}>Confirm Password</label>
				<input type="password" id={ids.confirmPassword} />
				<button className={styles.submit} type="submit">Sign up</button>
			</form>
		);
	}

}

export default Signup;
