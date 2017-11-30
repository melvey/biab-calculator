/* eslint no-invalid-this: 0 */
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
	email: {
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

		return bcrypt.hash(this.password, salt, (err2, hash) => {
			if(err2) {
				return next(err2);
			}
			this.password = hash;
			return next();
		});
	});

});

UserSchema.methods.comparePassword = function(password) {
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, this.password, (err, result) => {
			if(err) {
				return reject(err);
			}
			return resolve(result);
		});
	});
};

export default mongoose.model('User', UserSchema);
