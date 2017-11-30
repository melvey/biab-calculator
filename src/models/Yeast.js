import mongoose from 'mongoose';

const YeastSchema = new mongoose.Schema({

	yeast: {
		type: String,
		index: true
	},
	name: {
		type: String,
		index: true
	},
	code: {
		type: String,
		index: true
	},
	type: String,
	floculation: String,
	attenuation: {
		base: {
			type: Number,
			min: 0,
			max: 100
		},
		min: {
			type: Number,
			min: 0,
			max: 100
		},
		max: {
			type: Number,
			min: 0,
			max: 100
		}
	},
	temp: {
		min: {
			type: Number,
			min: 0
		},
		max: {
			type: Number,
			min: 0
		}
	},
	maxAlcohol: {
		type: Number,
		min: 0
	}
});

export {YeastSchema};
export default mongoose.model('Yeast', YeastSchema);
