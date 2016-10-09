import React, {Component, PropTypes} from 'react';
import grainData from '../data/grains.json';
import RecipeForm from '../components/RecipeForm';

class RecipeFormContainer extends Component {

	static propTypes = {
		className: PropTypes.string
	};

	constructor(props) {
		super();

		this.props = props;
	}

	render() {
		return (
			<RecipeForm {...this.props} grains={grainData} />
		);
	}

}

export default RecipeFormContainer;
