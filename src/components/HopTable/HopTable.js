import React, {Component, PropTypes} from 'react';
import styles from './HopTable.scss';

class HopTable extends Component {

	static propTypes = {
		className: PropTypes.string,
		hopsAvailable: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string,
			aa: PropTypes.number,
			decscription: PropTypes.string.
		})),
		updateFunc: PropTypes.func
	};

	constructor(props) {
		super();

		this.props = props;
		this.state = {
			hops: [
				this.getEmptyHopData()
			]
		};

		this.getEmptyHopData = this.getEmptyHopData.bind(this);
		this.updateHopType = this.updateHopType.bind(this);
		this.getHopFields = this.getHopFields.bind(this);
		this.getHopInput = this.getHopInput.bind(this);
	}

	getEmptyHopData() {
		return {
			index: null,
			name: '',
			aa: 0,
			description: ""
		};
	}

	updateHopType(index, value) {
		const hops = this.state.hops.slice(0);
		hops[index] = Object.assign({}, hops[index], this.props.hopsAvailable[value], {index});
		this.setState({hops});
		console.log(hops);
	}

	getHopFields(hopdata, index) {
		return (<div className={styles.hopField}>
			<select value={hopdata.index} onChange={(event) => this.updateHopType(index, event.target.value)}>
				<option>Select hop</option>
				{ this.props.hopsAvailable.map((aHop, hopIndex) => <option value={hopIndex} key={`option${hopIndex}`}>{aHop.name}</option>)}
			</select>
		</div>);
	}

	getHopInput(hopData, index) {
		return (<div className={styles.hopRow} key={index}>
			{this.getHopFields(hopData, index)}
			<div className={styles.alphaField}>
				<input type="number" onChange={(event) => this.updateAlpha(index, event.target.value)} />
				%	
			</div>
			<div className={styles.weightField}>
				<input type="number" onChange={(event) => this.updateWeight(index, event.target.value)} />
				Kg
			</div>
		</div>);
	}

	render() {
		const className = this.props.className ? `${styles.content} ${this.props.className}` : styles.content;
		return (
			<div className={className}>
				{this.state.hops.map((hopData, index) => this.getHopInput(hopData, index))}
			</div>
		);
	}

}

export default HopTable;
