const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { findById } = require('../models/User');

const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    email = email.toLowerCase();
    // match email
    try {
        const user = await User.findOne({email});
        if (!user) {
            return done(null, false, { message: 'User Not Found'});
        }
        const passwordMatch = await user.matchPassword(password);
        if (!passwordMatch) {
            return done(null, false, { message: 'Incorrect Password'});
        }
        return done(null, user)
    } catch (error) {
        return done(error);
    }

}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    }).lean()
})


