import mongoose from 'mongoose';

const GrainSchemaBase = {

	name: {
		type: String,
		index: true
	},
	ebc: Number,
	potential: {
		type: Number,
		min: 1,
		max: 1.046
	}
};

const GrainSchema = new mongoose.Schema(GrainSchemaBase);

export {GrainSchemaBase};
export default mongoose.model('Grain', GrainSchema);
