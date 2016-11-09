import mongoose from 'mongoose';
import config from '../src/config/mongo';
import grains from '../src/data/grains.json';
import Grain from '../src/models/Grain';

mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error);


mongoose.connection.once('open', () => {
	grains.forEach((grainData) => {
		var grainModel = new Grain(grainData);
		grainModel.save((err) => {
			if(!err) {
			console.log(grainModel);
		} else { 
			console.error(err);
		}
		});
	});
});

const connection = mongoose.connect(config);

