const express = require('express');
const router = express.Router();
const passport = require('passport');

// Controllers
const loginController = require('app/http/controllers/auth/loginController');
const registerController = require('app/http/controllers/auth/registerController');

// Validators
const registerValidator = require('app/http/validators/registerValidator.js');
const loginValidator = require('app/http/validators/loginValidator.js');

router.get('/login',
    loginController.showLoginForm
);
router.post('/login',
    loginValidator.handle(),
    loginController.loginProcess
);

router.get('/register',
    registerController.showRegisterationForm
);
router.post('/register',
    registerValidator.handle(),
    registerController.registerProcess
);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }, ));
router.get('/google/redirect', passport.authenticate('google', { successRedirect: '/', failureRedirect:'/auth/register' }));

module.exports = router;