const helpers = {}

// revisa si un user esta logueado
helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash('error_msg', 'This page does not exist, you were redirected');
    res.redirect('/')
}

module.exports = helpers