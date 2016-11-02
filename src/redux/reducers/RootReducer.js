/**
* RootReducer.js
* The root reducer to combine all other reducers used in the application
**/

import {combineReducers} from 'redux';
import recipeReducer from './RecipeReducer';
import settingsReducer from './SettingsReducer';

export default combineReducers({
	settings: settingsReducer,
	recipe: recipeReducer
});
