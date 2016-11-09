import mongoose from 'mongoose';

const GrainSchema = new mongoose.Schema({

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
});

export default mongoose.model('Grain', GrainSchema);
