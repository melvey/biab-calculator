import mongoose from 'mongoose';
import grains from '../src/data/grains.json';
import Grain from '../src/models/Grain';

mongoose.Promise = global.Promise;

grains.forEach((grainData) => {
	var grainModel = new Grain(grainData);
	grainModel.save().then((result) => {
		console.log(result);
	}).catch((err) => {
		console.log(err);
	});
});
