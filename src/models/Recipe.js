import mongoose from 'mongoose';
import extend from 'mongoose-schema-extend';
import {GrainSchema} from './Grain';
import {HopsSchema} from './Hops';
import {YeastSchema} from './Yeast';

const RecipeSchema = new mongoose.Schema({

	name: {
		type: String,
		index: true
	},
	volume: Number,
	grains: [
		GrainSchema.extend({{
			weight: Number
		}
	],
	hops: [
		HopsSchema.extend({
			weight: Number,
			time: Number
		}
	)]
	yeast: YeastSchema
});

export default mongoose.model('Recipe', GrainSchema);
