const userCtrl = {}
const User = require('../models/User');

userCtrl.renderLoginOrRegister = async (req, res) => {
    const users = (await User.find()).length;
    if (users) {
        res.render('users/login');
    } else {
        res.render('users/register');
    }
}

userCtrl.loginSave = (req, res) => {
    res.redirect('/')
}

userCtrl.registerSave = async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if (password.length >= 7 ) {
        const user = new User({
            name,
            email,
            password
        })
        user.password = user.matchPasswords(password);
        try {
            await user.save();
        } catch (error) {
            console.error(error);
            errors.push('this email is already exist');
            res.render('users/login', { errors });
        }
    } else {
        errors.push('error password');
        res.render('users/login', { errors });
    }
}

module.exports = userCtrl;