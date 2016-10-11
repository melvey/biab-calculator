import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import store from '../redux/store';
import RecipeForm from '../components/RecipeForm';
import grainData from '../data/grains.json';
import setGrainAction from '../redux/actions/SetGrainAction';
import setVolumeAction from '../redux/actions/SetVolumeAction';
import {calculateGravity} from '../lib/RecipeFunctions';

class RecipeFormContainer extends Component {

	static propTypes = {
		className: PropTypes.string
	};

	constructor(props) {
		super();

		this.state = {
			og: 0,
			fg: 0,
			alcohol: 0,
			ibu: 0
		};

		this.props = props;
	}

	componentWillReceiveProps(props) {
		console.log(props);
		// There is no gurantee the props actually change but a deep comparison of the states is probably more expensive than just recalculating the metrics
		this.setState({
			og: calculateGravity(props.recipe)
		});
		this.props = props;
	}

	updateGrains(grains) {
		store.dispatch(setGrainAction(grains));
	}

	updateVolume(volume) {
		store.dispatch(setVolumeAction(parseInt(volume, 10)));
	}


	render() {
		return (
			<RecipeForm
			{...this.props}
			metrics={this.state}
			grains={grainData}
			updateGrains={this.updateGrains}
			updateVolume={this.updateVolume}
			/>
		);
	}

}

const mapStateToProps = (state) => ({
	recipe: state.recipe
});


const ReduxContainer = connect(mapStateToProps)(RecipeFormContainer);

export default ReduxContainer;
