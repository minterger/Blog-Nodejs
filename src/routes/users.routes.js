const { Router } = require('express');
const { disconnect } = require('mongoose');
const passport = require('passport');
const router = Router();

const {
    renderLoginOrRegister,
    loginSave,
    renderRegister,
    registerSave,
    logout
} = require('../controllers/users.controller')
const { isAuthenticated } = require('../helpers/auth');

router.get('/login', renderLoginOrRegister);

router.post('/login', loginSave);

router.get('/register', isAuthenticated, renderRegister)

router.post('/register', registerSave);

router.get('/logout', isAuthenticated, logout);

module.exports = router;