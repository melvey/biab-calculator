import React, {Component, PropTypes} from 'react';
import styles from './GrainTable.scss';

class GrainTable extends Component {

	static propTypes = {
		className: PropTypes.string,
		grainsAvailable: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string,
			ebc: PropTypes.number,
			potential: PropTypes.number
		})),
		updateFunc: PropTypes.func
	};

	constructor(props) {
		super();

		this.props = props;
		this.state = {
			grains: [
				this.getEmptyGrainData()
			]
		};

		this.getEmptyGrainData = this.getEmptyGrainData.bind(this);
		this.updateGrainType = this.updateGrainType.bind(this);
		this.getGrainFields = this.getGrainFields.bind(this);
		this.getGrainInput = this.getGrainInput.bind(this);
		this.addRow = this.addRow.bind(this);
	}

	getEmptyGrainData() {
		return {
			index: null,
			name: '',
			ebc: 0,
			potential: 0,
			weight: 0
		};
	}

	updateGrainType(index, value) {
		console.log(this.state);
		console.log(typeof this.state.grains);
		const grains = this.state.grains.slice(0);
		grains[index] = Object.assign({}, grains[index], this.props.grainsAvailable[value], {index});
		this.setState({grains});
		if(typeof this.props.updateFunc === 'function') {
			this.props.updateFunc(grains);
		}
		console.log(grains);
	}

	updateWeight(index, value) {
		const grains = this.state.grains.slice(0);
		grains[index] = Object.assign({}, grains[index], {weight: value});
		this.setState({grains});
		if(typeof this.props.updateFunc === 'function') {
			this.props.updateFunc(grains);
		}
		console.log(grains);
	}

	getGrainFields(graindata, index) {
		return (<div className={styles.grainField}>
			<select value={graindata.index || ""} onChange={(event) => this.updateGrainType(index, event.target.value)}>
				<option value="">Select grain</option>
				{ this.props.grainsAvailable.map((aGrain, grainIndex) => <option value={grainIndex} key={`option${grainIndex}`}>{aGrain.name}</option>)}
			</select>
		</div>);
	}

	getGrainInput(grainData, index) {
		return (<div className={styles.grainRow} key={index}>
			{this.getGrainFields(grainData, index)}
			<div className={styles.weightField}>
				<input type="number" onChange={(event) => this.updateWeight(index, event.target.value)} />
				Kg
			</div>
		</div>);
	}

	addRow() {
		this.setState({
			grains: this.state.grains.slice(0).push(this.getEmptyGrainData())
		});
	}

	render() {
		const className = this.props.className ? `${styles.content} ${this.props.className}` : styles.content;
		return (
			<div className={className}>
				{this.state.grains.map((grainData, index) => this.getGrainInput(grainData, index))}
				<button onClick={this.addRow}>Add row</button>
			</div>
		);
	}

}

export default GrainTable;
