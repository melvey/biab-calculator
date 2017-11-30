import Express from 'express';
import winston from 'winston';
import Recipe from '../models/Recipe';
import connection from '../models/mongoose/connection';
import httpCodes from '../lib/httpCodes';

const app = new Express();

app.get('/:id', async (req, res) => {
	const id = req.params.id;
	console.log(id);
	return Recipe.findById(id)
		.then((recipe) => {
			console.log(recipe);
			res.status(httpCodes.success).json(recipe);
		})
		.catch((err) => {
			console.log(err);
			res.status(httpCodes.error).json(err);
		});
});

app.put('/', (req, res) => {
	if(req.user) {
		const recipeData = {...req.body, user: req.user.id};
		return connection
		.then(() => new Recipe(recipeData).save())
		.then((recipe) => res.status(httpCodes.success).json(recipe))
		.catch((err) => {
			winston.error(err);
			res.status(httpCodes.error).send(JSON.stringify({error: err}));
		});
	}
	res.status(httpCodes.unauthorised).json({message: 'Unauthorised'});
});

export default app;
