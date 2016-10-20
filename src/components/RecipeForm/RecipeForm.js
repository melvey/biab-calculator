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
			hops: PropTypes.hops
		}).isRequired,
		metrics: PropTypes.shape({
			og: PropTypes.number
		}),
		updateGrains: PropTypes.func.isRequired,
		updateHops: PropTypes.func.isRequired,
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
