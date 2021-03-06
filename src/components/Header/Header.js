import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router-dom';
import BrewConfiguration from '../../containers/BrewConfigurationContainer';
import styles from './Header.scss';
import logo from './hops.svg';
import cogImage from './cog.svg';

class Header extends Component {
	static propTypes = {
		user: PropTypes.shape({
			username: PropTypes.string
		})
	};

	constructor(props) {
		super();
		this.props = props;

		this.state = {
			settingsOn: false
		};

		this.toggleSettings = this.toggleSettings.bind(this);
	}

	toggleSettings() {
		this.setState({settingsOn: !this.state.settingsOn});
	}

	render() {
		return (
			<div className={styles.root}>
				<div className={styles.container}>
					<Link to="/" className={styles.brand}>
						<img src={logo} width="60" height="60" alt="BIAB Recipe Maker" />
					</Link>
					<div className={styles.banner}>
						<h1 className={styles.bannerTitle}>BIAB Recipe Maker</h1>
						<p className={styles.bannerDesc}>For your recipies and stuff</p>
					</div>
				</div>

				{ this.props.user
					? <div className={styles.userDetails}>{this.props.user.username}</div>
					: <div className={styles.userDetails}><Link to="/login">Login</Link></div>
				}

				<div className={styles.options}>
					<button className={styles.settingsBtn} onClick={this.toggleSettings}><img src={cogImage} alt="Settings button" /></button>
				</div>
				{this.state.settingsOn ? <BrewConfiguration className={styles.configModal} updateFunc={(evt) => console.log(evt)} settings={{efficiency: 75, grainDryWeight: 97, noChillTime: 40}} /> : null}
			</div>
		);
	}

}

export default Header;
