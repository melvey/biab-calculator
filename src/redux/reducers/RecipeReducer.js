/**
* RecipeReducer.js
* Redux Reducer for Recipe
**/

import actionTypes from '../actionTypes';

const defaultState = {
	volume: 0,
	grains: [],
	hops: [],
	adjuncts: []
}

function handleSetGrain(state, data) {
	return Object.assign({}, state, {grain: data});
}

function handleSetVolume(state, data) {
	return Object.assign({}, state, {volume: volume});
}

export default function setRecipeReducer(state, action) {
	switch(action.type) {
		case actionTypes.setGrain:
			return handleSetGrain(state, action.payload);
		case actionTypes.setVolume:
			return handleSetVolume(state, action.payload);
		default:
			return state || defaultState;
	}
}
