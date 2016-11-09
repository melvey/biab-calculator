import mongoose from 'mongoose';
import config from '../../config/mongo';

mongoose.Promise = global.Promise;

mongoose.connection.on('error', console.error);
mongoose.connection.once('open', () => console.log('Connected'));

export default mongoose.connect(config);
