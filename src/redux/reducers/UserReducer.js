/**
* UserReducer.js
* Redux Reducer for User
**/

import actionTypes from '../actionTypes';

function handleSetUser(state, data) {
  return Object.assign({}, state, {setUser: data});
}

export default function setUserReducer(state, action) {
	switch(action.type) {
		case actionTypes.setUser:
			return handleSetUser(state, action.payload);
		default:
			return state || {};
	}
}
