/* eslint react/forbid-prop-types: 0 */
import React, {Component, PropTypes} from 'react';
import uniqueId from 'lodash.uniqueid';
import GrainTable from '../GrainTable';
import HopTable from '../HopTable';
import styles from './RecipeForm.scss';


class RecipeForm extends Component {

	static propTypes = {
		className: PropTypes.string,
		styles: PropTypes.array,
		hops: PropTypes.array,
		grains: PropTypes.array,
		yeasts: PropTypes.array,
		adjuncts: PropTypes.array,
		recipe: PropTypes.shape({
			volume: PropTypes.number,
			grains: PropTypes.array,
			hops: PropTypes.array,
			yeast: PropTypes.shape({
				attenuation: PropTypes.shape({
					base: PropTypes.number
				}).isRequired
			}).isRequired
		}).isRequired,
		metrics: PropTypes.shape({
			og: PropTypes.number
		}),
		updateGrains: PropTypes.func.isRequired,
		updateHops: PropTypes.func.isRequired,
		updateYeast: PropTypes.func.isRequired,
		updateVolume: PropTypes.func.isRequired
	};

	constructor(props) {
		super();
		this.props = props;
		this.state = {
			inputIds: {
				name: uniqueId('name'),
				style: uniqueId('style'),
				volume: uniqueId('volume')
			}
		};

	}

	updateYeastType(index) {
		const intIndex = parseInt(index, 10);
		const yeast = Object.assign(
			{},
			this.props.yeasts[intIndex],
			{index: intIndex}
		);
		this.props.updateYeast(yeast);
	}

	updateYeastAttenuation(attenuation) {
		this.props.updateYeast(Object.assign({}, this.props.recipe.yeast, {attenuation: {base: parseInt(attenuation, 10)}}));
	}

	render() {
		const className = this.props.className ? `${styles.content} ${this.props.className}` : styles.content;

		return (
			<div className={className}>
				<div className={styles.inputs}>
					<div className={styles.row}>
						<span className={styles.nameField}>
							<label htmlFor={this.state.inputIds.name}>Name</label>
							<input type="text" id={this.state.inputIds.name} />
						</span>
						<span className={styles.styleField}>
							<label htmlFor={this.state.inputIds.style}>Style</label>
							<select>
								<option>Select style</option>
							</select>
						</span>
						<span className={styles.volumeField}>
							<label htmlFor={this.state.inputIds.volume}>volume</label>
							<input type="number" id={this.state.inputIds.volume} value={this.props.recipe.volume} onChange={(evt) => this.props.updateVolume(evt.target.value)} />
							<span className={styles.inputTail}>Litres</span>
						</span>
					</div>
					<GrainTable grains={this.props.recipe.grains} grainsAvailable={this.props.grains} updateFunc={this.props.updateGrains} />
					<HopTable hops={this.props.recipe.hops} hopsAvailable={this.props.hops} updateFunc={this.props.updateHops} />
					<div className={styles.yeastContainer}>
						<select value={this.props.recipe.yeast.index || ''} onChange={(event) => this.updateYeastType(event.target.value)}>
							<option value="">Select Yeast</option>
							{this.props.yeasts.map((aYeast, yeastIndex) => <option value={yeastIndex} key={`yeast${yeastIndex}`}>{aYeast.name}</option>)}
						</select>
						<label htmlFor={this.state.inputIds.yeastAttenuation}>Attenuation:</label>
						<input type="number" id={this.state.inputIds.yeastAttenuation} value={this.props.recipe.yeast.attenuation.base} onChange={(event) => this.updateYeastAttenuation(event.target.value)} />
					</div>
				</div>
				<div className={styles.results}>

					<div><span className={styles.metricLabel}>IBU:</span><span className={styles.metricValue}>{this.props.metrics.ibu}</span></div>
					<div><span className={styles.metricLabel}>OG:</span><span className={styles.metricValue}>{this.props.metrics.og}</span></div>
				</div>
			</div>
		);
	}

}

export default RecipeForm;
