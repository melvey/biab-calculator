import mongoose, {Schema} from 'mongoose';
import {GrainSchemaBase} from './Grain';
import {HopsSchemaBase} from './Hops';
import {YeastSchema} from './Yeast';

const RecipeSchema = new Schema({

	name: {
		type: String,
		index: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	volume: Number,
	grains: [{
		...GrainSchemaBase,
		weight: Number
	}],
	hops: [{
		...HopsSchemaBase,
		weight: Number,
		time: Number
	}],
	yeast: YeastSchema,
	createTime: {
		type: Date,
		default: Date.now
	}
}, { timestamps: {} } );

export default mongoose.model('Recipe', RecipeSchema);
