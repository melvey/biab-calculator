/**
* IngredientsReducer.js
* Redux Reducer for ingredients
**/

import actionTypes from '../actionTypes';

function handleSetGrainList(state, data) {
	console.log(data);
  return Object.assign({}, state, {grains: data});
}

function handleSetHopsList(state, data) {
  return Object.assign({}, state, {hops: data});
}

function handleSetYeastList(state, data) {
  return Object.assign({}, state, {yeast: data});
}

export default function setingredientsReducer(state, action) {
	switch(action.type) {
		case actionTypes.setGrainList:
			return handleSetGrainList(state, action.payload);
		case actionTypes.setHopsList:
			return handleSetHopsList(action.payload);
		case actionTypes.setYeastList:
			return handleSetYeastList(action.payload);
		default:
			return state || {};
	}
}
