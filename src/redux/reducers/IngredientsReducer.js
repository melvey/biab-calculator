/**
* IngredientsReducer.js
* Redux Reducer for ingredients
**/

import actionTypes from '../actionTypes';

function handleSetGrainList(store, data) {
  return Object.assign({}, store, {setGrainList: data});
}

function handleSetHopsList(data) {
	const newState = {
		setHopsList: data
	};
	return newState;
}

function handleSetYeastList(data) {
	const newState = {
		setYeastList: data
	};
	return newState;
}

export default function setingredientsReducer(state, action) {
	switch(action.type) {
		case actionTypes.setGrainList:
			return handleSetGrainList(store, action.payload);
		case actionTypes.setHopsList:
			return handleSetHopsList(action.payload);
		case actionTypes.setYeastList:
			return handleSetYeastList(action.payload);
		default:
			return state || {};
	}
}
