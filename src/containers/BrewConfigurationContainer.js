import Relay, {Store} from 'react-relay';
import {connect} from 'react-redux';
import BrewConfiguration from '../components/BrewConfiguration';

const mapStateToProps = (state) => ({
	// Modify this to only include the required properties
	...state
});


const ReduxContainer = connect(mapStateToProps)(BrewConfiguration);

export default ReduxContainer;
