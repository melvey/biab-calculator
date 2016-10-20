/**
* RecipeReducer.js
* Redux Reducer for Recipe
**/

import actionTypes from '../actionTypes';

const defaultState = {
	volume: 20,
	grains: [],
	hops: [],
	adjuncts: []
};

function handleSetGrain(state, data) {
	return Object.assign({}, state, {grains: data});
}

function handleSetVolume(state, data) {
	return Object.assign({}, state, {volume: data});
}

function handleSetHops(state, data) {
	return Object.assign({}, state, {hops: data});
}

export default function setRecipeReducer(state, action) {
	switch(action.type) {
		case actionTypes.setGrain:
			return handleSetGrain(state, action.payload);
		case actionTypes.setVolume:
			return handleSetVolume(state, action.payload);
		case actionTypes.setHops:
			return handleSetHops(state, action.payload);
		default:
			return state || defaultState;
	}
}
