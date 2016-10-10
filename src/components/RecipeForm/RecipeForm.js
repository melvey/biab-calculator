import React, {Component, PropTypes} from 'react';
import uniqueId from 'lodash.uniqueid';
import GrainTable from '../GrainTable';
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
			grains: PropTypes.array
		}),
		updateGrains: PropTypes.func,
		updateVolume: PropTypes.func
	};

	constructor(props) {
		super();
		this.props = props;
		this.state = {
			name: '',
			style: null,
			volume: 0,
			grains: [],
			adjuncts: [],
			hops: [],
			yeast: null,
			bottle: false,
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
							<input type="number" id={this.state.inputIds.volume} onChange={(evt) => this.props.updateVolume(evt.target.value)} />
							<span className={styles.inputTail}>Litres</span>
						</span>
					</div>
					<GrainTable grains={this.props.recipe.grains} grainsAvailable={this.props.grains} updateFunc={this.props.updateGrains} />
				</div>
				<div className={styles.results}>
					<div>OG: {this.props.metrics.og}</div>
				</div>
			</div>
		);
	}

}

export default RecipeForm;
