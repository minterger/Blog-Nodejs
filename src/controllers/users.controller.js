const userCtrl = {}
const passport = require('passport');
const User = require('../models/User');

userCtrl.renderLoginOrRegister = async (req, res) => {
    const users = (await User.find()).length;
    if (users) {
        res.render('users/login');
    } else {
        res.render('users/register');
    }
}

userCtrl.loginSave = passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
    failureFlash: true 
});

userCtrl.renderRegister = (req, res) => {
    res.render('users/register')
}

userCtrl.registerSave = async (req, res) => {
    const { name, user_email, password, confirm_password } = req.body;
    const email = user_email.toLowerCase();
    const errors = [];
    if (password.length <= 7) {
        errors.push('password dont match')
    }
    if (password !== confirm_password ) {
        errors.push('error password');
    }
    
    if (errors.length <= 0) {
        const newUser = new User({
            name,
            email,
            password
        })
        newUser.password = await newUser.encryptPasswords(password);
        try {
            await newUser.save();
            req.flash('success_msg', 'Successfully registered user');
            res.redirect('/login')
        } catch (error) {
            console.error(error);
            errors.push('This email is already exist');
            res.render('users/register', { errors });
        }
    } else {
        console.log(email)
        res.render('users/register', { errors });
    }
}

userCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out now');
    res.redirect('/')
}

module.exports = userCtrl;