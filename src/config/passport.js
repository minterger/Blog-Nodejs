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
        // comprobar si existe un user con ese email
        const user = await User.findOne({email});
        if (!user) {
            return done(null, false, { message: 'Incorrect Password or Email'});
        }

        // comprobar si la contraseña puesta coincide con la del user
        const passwordMatch = await user.matchPassword(password, user.password);
        if (!passwordMatch) {
            return done(null, false, { message: 'Incorrect Password or Email'});
        }
        return done(null, user)
    } catch (error) {
        return done(error);
    }

}))

// mantiene la sesion activa

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    }).lean()
})


