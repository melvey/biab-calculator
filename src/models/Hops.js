import mongoose from 'mongoose';

const HopsSchema = new mongoose.Schema({

	name: {
		type: String,
		index: true
	},
	aa: Number,
	description: String
});

export default mongoose.model('Hops', HopsSchema);
