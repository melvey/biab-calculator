import setMessageAction from '../../redux/actions/SetMessageAction';
import store from '../../redux/store';

function preloadStore(renderProps, req) {
		store.dispatch(setMessageAction(req.flash()));
		return store;
}

export default preloadStore;
