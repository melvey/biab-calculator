import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import store from '../redux/store';
import RecipeForm from '../components/RecipeForm';
import grainData from '../data/grains.json';
import setGrainAction from '../redux/actions/SetGrainAction';
import setVolumeAction from '../redux/actions/SetVolumeAction';

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
			og: this.calculateGravity(props.recipe)
		});
		this.props = props;
	}

	updateGrains(grains) {
		store.dispatch(setGrainAction(parseInt(grains, 10)));
	}

	updateVolume(volume) {
		store.dispatch(setVolumeAction(parseInt(volume, 10)));
	}

	calculateGravity(recipe) {
		let gravity = 1;
		console.log(recipe);
		if(recipe.volume > 0) {
			const efficency = 0.85;
			const percentWater = 0.03;	// allow 3% water in grain weight
			let plato = 0;

			// Bloody reduce doesn't seem to get called. I think I might be having some computer problems
			recipe.grains.forEach((elem) => {
				plato += (elem.weight * (1 - percentWater) * elem.potential * efficency * 100);
			});
			gravity = 1 + ((plato / recipe.volume) / 10);
		}
		return gravity;
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
