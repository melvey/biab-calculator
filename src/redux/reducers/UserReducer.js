/**
* UserReducer.js
* Redux Reducer for User
**/

import actionTypes from '../actionTypes';

function handleSetUser(state, data) {
	return data || null;
}

export default function setUserReducer(state, action) {
	switch(action.type) {
		case actionTypes.setUser:
			return handleSetUser(state, action.payload);
		default:
			return state || null;
	}
}
