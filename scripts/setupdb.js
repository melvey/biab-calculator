/*eslint no-console: 0 */
import grains from '../src/data/grains.json';
import hops from '../src/data/hops.json';
import yeasts from '../src/data/yeasts.json';
import Grain from '../src/models/Grain';
import Hops from '../src/models/Hops';
import Yeast from '../src/models/Yeast';
import connection from '../src/models/mongoose/connection';

connection.then(() => {

	const grainPromises = grains.map((grainData) => {
		const grainModel = new Grain(grainData);
		return grainModel.save().then(() => {
			console.log(grainModel);
		});
	});

	const hopPromises = hops.map((hopData) => {
		const hopModel = new Hops(hopData);
		return hopModel.save().then(() => {
			console.log(hopModel);
		});
	});

	const yeastPromises = yeasts.map((yeastData) => {
		const yeastModel = new Yeast(yeastData);
		return yeastModel.save().then(() => {
			console.log(yeastModel);
		});
	});


	Promise.all([].concat(grainPromises, hopPromises, yeastPromises)).then(() => {
		console.log('Complete');
		process.exit();
	}).catch((err) => {
		console.error(err);
		process.exit();
	});
});
