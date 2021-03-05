const { Router } = require('express');
const router = Router();

const {
    renderLoginOrRegister,
    loginSave,
    registerSave
} = require('../controllers/users.controller')

router.get('/login', renderLoginOrRegister);

router.post('/login', loginSave);

router.post('/register', registerSave);

module.exports = router;