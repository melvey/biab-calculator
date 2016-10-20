import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import store from '../redux/store';
import RecipeForm from '../components/RecipeForm';
import grainData from '../data/grains.json';
import hopsData from '../data/hops.json';
import yeastData from '../data/yeasts.json';
import setGrainAction from '../redux/actions/SetGrainAction';
import setHopsAction from '../redux/actions/SetHopsAction';
import setVolumeAction from '../redux/actions/SetVolumeAction';
import setYeastAction from '../redux/actions/SetYeastAction';
import {getOriginalGravity} from '../lib/GravityCalculator';
import getIBUs from '../lib/getIBUs';

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
		// There is no gurantee the props actually change but a deep comparison of the states is probably more expensive than just recalculating the metrics
		const og = getOriginalGravity(props.recipe);
		const ibu = getIBUs(props.recipe, {og});
		this.setState({
			og,
			ibu
		});
		this.props = props;
	}

	static updateGrains(grains) {
		store.dispatch(setGrainAction(grains));
	}

	static updateHops(hops) {
		store.dispatch(setHopsAction(hops));
	}

	static updateVolume(volume) {
		store.dispatch(setVolumeAction(parseInt(volume, 10)));
	}

	static updateYeast(yeast) {
		store.dispatch(setYeastAction(yeast));
	}


	render() {
		return (
			<RecipeForm
				{...this.props}
				metrics={this.state}
				grains={grainData}
				updateGrains={RecipeFormContainer.updateGrains}
				updateHops={RecipeFormContainer.updateHops}
				hops={hopsData}
				yeasts={yeastData}
				updateYeast={RecipeFormContainer.updateYeast}
				updateVolume={RecipeFormContainer.updateVolume}
			/>
		);
	}

}

const mapStateToProps = (state) => ({
	recipe: state.recipe
});


const ReduxContainer = connect(mapStateToProps)(RecipeFormContainer);

export default ReduxContainer;
