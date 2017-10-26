/**
* RecipeReducer.js
* Redux Reducer for Recipe
**/

import actionTypes from '../actionTypes';

const defaultState = {
	loaded: false,
	volume: 20,
	grains: [],
	hops: [],
	adjuncts: [],
	yeast: {
		name: '',
		attenuation: {
			base: 0
		}
	}
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

function handleSetYeast(state, data) {
	return Object.assign({}, state, {yeast: data});
}

export default function setRecipeReducer(state, action) {
	switch(action.type) {
		case actionTypes.setGrain:
			return handleSetGrain(state, action.payload);
		case actionTypes.setVolume:
			return handleSetVolume(state, action.payload);
		case actionTypes.setHops:
			return handleSetHops(state, action.payload);
		case actionTypes.setYeast:
			return handleSetYeast(state, action.payload);
		default:
			return state || defaultState;
	}
}
