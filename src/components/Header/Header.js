import React, { Component } from 'react';
import styles from './Header.scss';
import {Link} from 'react-router';
import logo from './hops.svg';

class Header extends Component {

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
				</div>
		);
  }

}

export default Header;
