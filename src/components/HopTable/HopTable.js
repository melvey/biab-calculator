import React, {Component, PropTypes} from 'react';
import styles from './HopTable.scss';

class HopTable extends Component {

	static propTypes = {
		className: PropTypes.string,
		hopsAvailable: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string,
			aa: PropTypes.number,
			decscription: PropTypes.string
		})).isRequired,
		hops: PropTypes.arrayOf(PropTypes.shape({
			aa: PropTypes.number,
			weight: PropTypes.number
		})).isRequired,
		updateFunc: PropTypes.func.isRequired
	};

	constructor(props) {
		super();

		this.props = props;

		this.updateHopType = this.updateHopType.bind(this);
		this.getHopFields = this.getHopFields.bind(this);
		this.getHopInput = this.getHopInput.bind(this);
		this.addRow = this.addRow.bind(this);
	}

	componentWillMount() {
		if(!this.props.hops.length) {
			this.props.updateFunc([HopTable.getEmptyHopData()]);
		}
	}

	static getEmptyHopData() {
		return {
			index: null,
			name: '',
			aa: 0,
			weight: 0
		};
	}

	updateHopType(index, value) {
		const hops = this.props.hops.slice(0);
		hops[index] = Object.assign({}, hops[index], this.props.hopsAvailable[value], {index: value});
		this.props.updateFunc(hops);
	}

	updateWeight(index, value) {
		const hops = this.props.hops.slice(0);
		hops[index] = Object.assign({}, hops[index], {weight: value});
		this.props.updateFunc(hops);
	}

	getHopFields(hopdata, index) {
		return (<div className={styles.hopField}>
			<select value={hopdata.index || ''} onChange={(event) => this.updateHopType(index, event.target.value)}>
				<option value="">Select hop</option>
				{ this.props.hopsAvailable.map((aHop, hopIndex) => <option value={hopIndex} key={`option${hopIndex}`}>{aHop.name}</option>)}
			</select>
		</div>);
	}

	getHopInput(hopData, index) {
		return (<div className={styles.hopRow} key={index}>
			{this.getHopFields(hopData, index)}
			<div className={styles.weightField}>
				<input type="number" value={hopData.weight} onChange={(event) => this.updateWeight(index, event.target.value)} />
				Kg
			</div>
		</div>);
	}

	addRow() {
		const hops = this.props.hops.slice(0);
		hops.push(HopTable.getEmptyHopData());
		this.props.updateFunc(hops);
	}

	render() {
		const className = this.props.className ? `${styles.content} ${this.props.className}` : styles.content;
		return (
			<div className={className}>
				<h3>Hops</h3>
				{this.props.hops.map((hopData, index) => this.getHopInput(hopData, index))}
				<button onClick={this.addRow}>Add row</button>
			</div>
		);
	}

}

export default HopTable;
