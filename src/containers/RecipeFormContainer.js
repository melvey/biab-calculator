import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import store from '../redux/store';
import RecipeForm from '../components/RecipeForm';
import grainData from '../data/grains.json';
import setGrainAction from '../redux/actions/SetGrainAction';

class RecipeFormContainer extends Component {

	static propTypes = {
		className: PropTypes.string
	};

	constructor(props) {
		super();

		this.props = props;
	}

	updateGrains(grains) {
		store.dispatch(setGrainAction(grains));
	}

	render() {
		return (
			<RecipeForm {...this.props} grains={grainData} updateGrains={this.updateGrains} />
		);
	}

}

const mapStateToProps = (state) => ({
	// Modify this to only include the required properties
	...state.recipe
});


const ReduxContainer = connect(mapStateToProps)(RecipeFormContainer);

export default ReduxContainer;
