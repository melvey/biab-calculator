/**
* RootReducer.js
* The root reducer to combine all other reducers used in the application
**/

import {combineReducers} from 'redux';
import recipeReducer from './RecipeReducer';

export default combineReducers({
	recipe: recipeReducer
});
