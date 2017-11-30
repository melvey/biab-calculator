/**
* MessagesReducer.js
* Redux Reducer for Messages
**/

import actionTypes from '../actionTypes';

function handleSetMessage(state, data) {
	console.log('HLLO');
	console.log(data);
	return data;
}

export default function setMessagesReducer(state, action) {
	switch(action.type) {
		case actionTypes.setMessage:
			return handleSetMessage(state, action.payload);
		default:
			return state || {};
	}
}
