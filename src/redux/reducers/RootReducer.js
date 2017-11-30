/**
* RootReducer.js
* The root reducer to combine all other reducers used in the application
**/

import {combineReducers} from 'redux';
import recipeReducer from './RecipeReducer';
import userReducer from './UserReducer';
import settingsReducer from './SettingsReducer';
import ingredientsReducer from './IngredientsReducer';

export default combineReducers({
	settings: settingsReducer,
	user: userReducer,
	ingredients: ingredientsReducer,
	recipe: recipeReducer
});
