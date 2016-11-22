import Express from 'express';
import Yeast from '../models/Yeast';
import connection from '../models/mongoose/connection';

const app = new Express();

app.get('/', (req, res) => {
	connection.then(() => Yeast.find())
	.then((yeasts) => {
		console.log(yeasts);
		res.send(JSON.stringify(yeasts.map((yeast) => ({
			id: yeast._id,
			name: yeast.name,
			attenuation: yeast.attenuation
		}))));

	}).catch((err) => {
		console.error(err);
		res.send(err);
	});
});

export default app;
