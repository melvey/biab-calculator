import setMessageAction from '../../redux/actions/SetMessageAction';
import setUserAction from '../../redux/actions/SetUserAction';
import store from '../../redux/store';

function preloadStore(req) {
	store.dispatch(setMessageAction(req.flash()));
	store.dispatch(setUserAction(req.user));
	return store;
}

export default preloadStore;
