import Express from 'express';
import winston from 'winston';
import User from '../models/User';
import connection from '../models/mongoose/connection';
import httpCodes from '../lib/httpCodes';

const app = new Express();

app.put('/', (req, res) => {
	connection
	.then(() => Promise.all([
		User.findOne({username: req.body.username}),
		User.findOne({email: req.body.email})
	]))
	.then((existing) => {
		if(existing[0]) {
			return res.status(httpCodes.success).send(JSON.stringify({error: 'Username is already in use'}));
		}
		if(existing[1]) {
			return res.status(httpCodes.success).send(JSON.stringify({error: 'Email address is already in use'}));
		}

		// Create the user account
		return new User(req.body).save().then((user) => res.status(httpCodes.success)
			.send(JSON.stringify({message: `Successfully created account ${user.username}`}))
		);
	}).catch((err) => {
		winston.error(err);
		res.status(httpCodes.error).send(JSON.stringify({error: err}));
	});
});

export default app;
