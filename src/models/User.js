import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;


const UserSchema = new mongoose.Schema({

	username: {
		type: String,
		index: {
			unique: true
		}
	},
	password: {
		type: String,
		required: true
	}
});

UserSchema.pre('save', function(next) {
	if(!this.isModified('password')) {
		return next();
	}

	return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
		if(err) {
			return next(err);
		}

		bcrypt.hash(this.password, salt, (err, hash) => {
			if(err) {
				return next(err);
			}
			this.password = hash;
			next();
		});
	});

});

UserSchema.methods.comparePassword = function(password, callback) {
	bcrypt.compare(password, this.password, callback);
};

export default mongoose.model('User', UserSchema);
