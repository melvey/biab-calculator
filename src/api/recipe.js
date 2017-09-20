import Express from 'express';
import winston from 'winston';
import Recipe from '../models/Recipe';
import connection from '../models/mongoose/connection';
import httpCodes from '../lib/httpCodes';

const app = new Express();

app.put('/', (req, res) => {
	if(req.user) {
		return connection
		.then(() => new Recipe({...req.body, user: req.user._id}).save())
		.then((recipe) => res.status(httpCodes.success).json(recipe))
		.catch((err) => {
			winston.error(err);
			res.status(httpCodes.error).send(JSON.stringify({error: err}));
		});
	}
	res.status(httpCodes.unauthorised).json({message: 'Unauthorised'});
});

export default app;
