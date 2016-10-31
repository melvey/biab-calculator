import React, {Component} from 'react';
import {Link} from 'react-router';
import BrewConfiguration from '../BrewConfiguration';
import styles from './Header.scss';
import logo from './hops.svg';
import cogImage from './cog.svg';

class Header extends Component {

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

				<div className={styles.options}>
					<button className={styles.settingsBtn} onClick={this.toggleSettings}><img src={cogImage} alt="Settings button" /></button>
				</div>
				{this.state.settingsOn ? <BrewConfiguration className={styles.configModal} updateFunc={(evt) => console.log(evt)} settings={{efficiency: 75, grainDryWeight: 97, noChillTime: 40}} /> : null}
			</div>
		);
	}

}

export default Header;
