import mongoose, {Schema} from 'mongoose';
import extend from 'mongoose-schema-extend';
import {GrainSchema} from './Grain';
import {HopsSchema} from './Hops';
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
	grains: [
		GrainSchema.extend({
			weight: Number
		})
	],
	hops: [
		HopsSchema.extend({
			weight: Number,
			time: Number
		})
	],
	yeast: YeastSchema,
	createTime: {
		type: Date,
		default: Date.now
	}
}, { timestamps: {} } );

export default mongoose.model('Recipe', GrainSchema);
