/**
* UserReducer.js
* Redux Reducer for User
**/

import actionTypes from '../actionTypes';

function handleSetUset(state, data) {
  return Object.assign({}, state, {setUset: data});
}

export default function setUserReducer(state, action) {
	switch(action.type) {
		case actionTypes.setUset:
			return handleSetUset(state, action.payload);
		default:
			return state || {};
	}
}
