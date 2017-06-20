import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import store from '../redux/store';
import RecipeForm from '../components/RecipeForm';
import hopsData from '../data/hops.json';
import yeastData from '../data/yeasts.json';
import setGrainAction from '../redux/actions/SetGrainAction';
import setHopsAction from '../redux/actions/SetHopsAction';
import setVolumeAction from '../redux/actions/SetVolumeAction';
import setYeastAction from '../redux/actions/SetYeastAction';
import setGrainListAction from '../redux/actions/SetGrainListAction';
import {getOriginalGravity, getFinalGravity, getAlcohol} from '../lib/GravityCalculator';
import getIBUs from '../lib/getIBUs';
import grainLoader from '../loaders/grainLoader';

class RecipeFormContainer extends Component {

	static propTypes = {
		className: PropTypes.string
	};

	constructor(props) {
		super();

		console.log(this.props);

		this.state = {
			og: 0,
			fg: 0,
			alcohol: 0,
			ibu: 0
		};

		this.props = props;
	}

	componentDidMount() {
		if(!this.props.grainList || !this.props.grainList.length) {
			grainLoader().then((grain) => store.dispatch(setGrainListAction(grain)));
		}
	}

	componentWillReceiveProps(props) {
		// There is no gurantee the props actually change but a deep comparison of the states is probably more expensive than just recalculating the metrics
		const og = getOriginalGravity(props.recipe, props.settings);
		const fg = getFinalGravity(og, props.recipe.yeast, props.settings);
		const alcohol = getAlcohol(og, fg);
		const ibu = getIBUs(props.recipe, {og});
		this.setState({
			og,
			fg,
			alcohol,
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
				grains={this.props.grainList}
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
	recipe: state.recipe,
	grainList: state.ingredients.grains || [],
	settings: state.settings
});


const ReduxContainer = connect(mapStateToProps)(RecipeFormContainer);

export default ReduxContainer;
