import LocalStrategy from 'passport-local';
import User from '../models/User';
const invalidMessage = {message: 'Invalid username or password'};

export default new LocalStrategy(
	(username, password, done) => User.findOne({username}).then((user) => {
		if(!user) {
			return done(null, false, invalidMessage);
		}
		return user.comparePassword(password)
			.then((result) => (result ? done(null, user) : done(null, result, invalidMessage)))
			.catch((err) => done(err, false));
	}).catch((err) => {
		console.error(err);
		return done(err, false);
	})
);
