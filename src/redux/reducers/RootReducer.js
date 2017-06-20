/**
* RootReducer.js
* The root reducer to combine all other reducers used in the application
**/

import {combineReducers} from 'redux';
import recipeReducer from './RecipeReducer';
import settingsReducer from './SettingsReducer';
import ingredientsReducer from './IngredientsReducer';

export default combineReducers({
	settings: settingsReducer,
	ingredients: ingredientsReducer,
	recipe: recipeReducer
});
