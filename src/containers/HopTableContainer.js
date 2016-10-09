import React, {Component, PropTypes} from 'react';
import HopTable from '../components/HopTable';

class HopTableContainer extends Component {

	static propTypes = {
		className: PropTypes.string
	};

	constructor(props) {
		super();

		this.props = props;
	}

	render() {
		return (
			<HopTable {...this.props} />
		);
	}

}

export default HopTableContainer;
