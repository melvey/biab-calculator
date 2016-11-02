import React, {Component, PropTypes} from 'react';
import styles from './BrewConfiguration.scss';

class BrewConfiguration extends Component {

	static propTypes = {
		className: PropTypes.string,
		settings: PropTypes.shape({
			efficiency: PropTypes.number,
			grainDryWeight: PropTypes.number,
			noChillTime: PropTypes.number
		}),
		updateFunc: PropTypes.func.isRequired
	};

	constructor(props) {
		super();

		this.props = props;
		this.state = {
			efficiencyId: 'brew_configuration-efficiency-input',
			dryWeightId: 'brew_configuration-dryweight-input',
			nochillId: 'brew_configuration-nochill-input'
		};

		this.updateEfficiency = this.updateEfficiency.bind(this);
		this.updateDryWeight = this.updateDryWeight.bind(this);
		this.updateNoChill = this.updateNoChill.bind(this);
	}

	updateEfficiency(evt) {
		this.props.updateFunc(Object.assign({}, this.props.settings, {efficiency: parseFloat(evt.target.value)}));
	}
	updateDryWeight(evt) {
		this.props.updateFunc(Object.assign({}, this.props.settings, {grainDryWeight: parseFloat(evt.target.value)}));
	}
	updateNoChill(evt) {
		this.props.updateFunc(Object.assign({}, this.props.settings, {noChillTime: parseFloat(evt.target.value)}));
	}

	render() {
		const className = this.props.className ? `${styles.content} ${this.props.className}` : styles.content;
		return (
			<div className={className}>
				<div className={styles.row}>
					<label htmlFor={this.state.efficiencyId}>Efficiency</label>
					<input type="number" id={this.state.efficiencyID} value={this.props.settings.efficiency} onChange={this.updateEfficiency} />%
				</div>
				<div className={styles.row}>
					<label htmlFor={this.state.dryWeightId}>Grain Dry Weight</label>
					<input type="number" id={this.state.dryWeightId} value={this.props.settings.grainDryWeight} onChange={this.updateDryWeight} />%
				</div>
				<div className={styles.row}>
					<label htmlFor={this.state.nochillId}>No chill time factor</label>
					<input type="number" id={this.state.nochillId} value={this.props.settings.noChillTime} onChange={this.updateNoChill} />mins
				</div>
			</div>
		);
	}

}

export default BrewConfiguration;
