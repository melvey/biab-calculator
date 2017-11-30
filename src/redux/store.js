/**
* store.js
* Redux store definiation
**/
import {createStore} from 'redux';
import reducer from './reducers/RootReducer';

let preloadedState = {};
if(typeof(window) !== 'undefined') {
	preloadedState = window.__PRELOADED_STATE__;
	// Without using combineReducers from redux-immutablejs (https://github.com/indexiatech/redux-immutablejs) the state can't be a immutable object so convert all the properties to immutable
	Object.getOwnPropertyNames(preloadedState).forEach((prop) => {
		//preloadedState[prop] = Immutable.fromJS(preloadedState[prop]);

		// Convert survey dates to Date objects - maybe we could do this with the reducer function instead????
		if(prop === 'survey') {
			const openDate = preloadedState[prop].get('openDate');
			if(typeof openDate === 'string') {
				preloadedState[prop] = preloadedState[prop].set('openDate', new Date(openDate));
			}

			const endDate = preloadedState[prop].get('endDate');
			if(typeof endDate === 'string') {
				preloadedState[prop] = preloadedState[prop].set('endDate', new Date(endDate));
			}
		}
	});
}

console.log(JSON.stringify(preloadedState));

export default createStore(reducer, preloadedState);

