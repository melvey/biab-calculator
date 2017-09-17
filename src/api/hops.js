import Express from 'express';
import Hops from '../models/Hops';
import connection from '../models/mongoose/connection';

const app = new Express();

app.get('/', (req, res) => {
	connection.then(() => Hops.find())
	.then((hops) => {
		res.send(JSON.stringify(hops));

	}).catch((err) => {
		console.error(err);
		res.send(err);
	})
});

export default app;
