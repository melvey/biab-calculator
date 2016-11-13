import Express from 'express';
import Grain from '../models/Grain';
import connection from '../models/mongoose/connection';

const app = new Express();

app.get('/', (req, res) => {
	connection.then(() => Grain.find())
	.then((grains) => {
		console.log(grains);
		res.send(JSON.stringify(grains));

	}).catch((err) => {
		console.error(err);
		res.send(err);
	})
});

export default app;
