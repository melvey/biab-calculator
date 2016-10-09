import React, {Component} from 'react';
import RecipeForm from '../../containers/RecipeFormContainer';
import styles from './Index.scss';

class Index extends Component {

	render() {
		return (
			<div className={styles.root}>
				<div className={styles.container}>
					<div className={styles.heading}>
						<h2>Sample Page</h2>
					</div>
					<div className={styles.content}>
						<RecipeForm />
					</div>
				</div>
			</div>
		);
	}

}

export default Index;
