/**
* SettingsReducer.js
* Redux Reducer for settings
**/

import actionTypes from '../actionTypes';

function handleSetSettings(store, data) {
  return Object.assign({}, store, {...data});
}

export default function setsettingsReducer(state, action) {
	const currentState = state || {
		efficiency: 85,
		dryGrainWeight: 0.97,
		noChillTime: 10
	};

	switch(action.type) {
		case actionTypes.setSettings:
			return handleSetSettings(currentState , action.payload);
		default:
			return currentState;
	}
}