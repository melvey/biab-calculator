import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import store from '../redux/store';
import RecipeForm from '../components/RecipeForm';
import setGrainAction from '../redux/actions/SetGrainAction';
import setHopsAction from '../redux/actions/SetHopsAction';
import setVolumeAction from '../redux/actions/SetVolumeAction';
import setYeastAction from '../redux/actions/SetYeastAction';
import setGrainListAction from '../redux/actions/SetGrainListAction';
import setHopsListAction from '../redux/actions/SetHopsListAction';
import setYeastListAction from '../redux/actions/SetYeastListAction';
import {getOriginalGravity, getFinalGravity, getAlcohol} from '../lib/GravityCalculator';
import getIBUs from '../lib/getIBUs';
import grainLoader from '../loaders/grainLoader';
import hopsLoader from '../loaders/hopsLoader';
import yeastLoader from '../loaders/yeastLoader';
import recipeLoader from '../loaders/recipeLoader';

class RecipeFormContainer extends Component {

	static propTypes = {
		className: PropTypes.string,
		grainList: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string,
			ebc: PropTypes.number,
			potential: PropTypes.number
		})),
		hopsList: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string,
			description: PropTypes.string,
			aa: PropTypes.number
		})),
		yeastList: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string,
			attenuation: PropTypes.number
		}))
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

	componentDidMount() {
		if(!this.props.grainList || !this.props.grainList.length) {
			grainLoader().then((grain) => store.dispatch(setGrainListAction(grain)));
		}
		if(!this.props.hopsList || !this.props.hopsList.length) {
			hopsLoader().then((hops) => store.dispatch(setHopsListAction(hops)));
		}
		if(!this.props.yeastList || !this.props.yeastList.length) {
			yeastLoader().then((yeast) => store.dispatch(setYeastListAction(yeast)));
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

	static save() {
		const state = store.getState();
		recipeLoader(state.recipe)
	}

	render() {
		console.log(this.props);
		return (
			<RecipeForm
				{...this.props}
				metrics={this.state}
				grains={this.props.grainList}
				updateGrains={RecipeFormContainer.updateGrains}
				updateHops={RecipeFormContainer.updateHops}
				hops={this.props.hopsList}
				yeasts={this.props.yeastList}
				updateYeast={RecipeFormContainer.updateYeast}
				updateVolume={RecipeFormContainer.updateVolume}
				saveFunc={RecipeFormContainer.save}
			/>
		);
	}

}

const mapStateToProps = (state) => ({
	recipe: state.recipe,
	authenticated: !!state.user,
	grainList: state.ingredients.grains || [],
	hopsList: state.ingredients.hops || [],
	yeastList: state.ingredients.yeast || [],
	settings: state.settings
});


const ReduxContainer = connect(mapStateToProps)(RecipeFormContainer);

export default ReduxContainer;
