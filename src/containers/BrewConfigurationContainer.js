import {connect} from 'react-redux';
import store from '../redux/store';
import setSettingsAction from '../redux/actions/SetSettingsAction';
import BrewConfiguration from '../components/BrewConfiguration';

const mapStateToProps = (state) => ({
	settings: state.settings,
	updateFunc: (settings) => {
		store.dispatch(setSettingsAction(settings));
	}
});

const ReduxContainer = connect(mapStateToProps)(BrewConfiguration);

export default ReduxContainer;
