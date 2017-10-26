import mongoose from 'mongoose';

const HopsSchemaBase = {

	name: {
		type: String,
		index: true
	},
	aa: Number,
	description: String
};

const HopsSchema = new mongoose.Schema(HopsSchemaBase);

export {HopsSchemaBase};
export default mongoose.model('Hops', HopsSchema);
