const express = require('express');
const router = express.Router();
const passport = require('passport');

// Controllers
const loginController = require('app/http/controllers/auth/loginController');
const registerController = require('app/http/controllers/auth/registerController');
const forgetPasswordController = require('app/http/controllers/auth/forgetPasswordController');
const resetPasswordController = require('app/http/controllers/auth/resetPasswordController');

// Validators
const registerValidator = require('app/http/validators/registerValidator');
const loginValidator = require('app/http/validators/loginValidator');
const forgetPasswordValidator = require('app/http/validators/forgetPasswordValidator');
const resetPasswordValidator = require('app/http/validators/resetPasswordValidator');

router.get('/login', loginController.showLoginForm);
router.post('/login', loginValidator.handle(), loginController.loginProcess);

router.get('/register', registerController.showRegisterationForm);
router.post('/register', registerValidator.handle(), registerController.registerProcess);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }, ));
router.get('/google/redirect', passport.authenticate('google', { successRedirect: '/', failureRedirect:'/auth/register' }));

router.get('/password/reset', forgetPasswordController.showForgetPasswordForm);
router.post('/password/email', forgetPasswordValidator.handle(), forgetPasswordController.sendPasswordResetLink);

router.get('/password/reset/:token', resetPasswordController.showResetPasswordForm);
router.post('/password/reset', resetPasswordValidator.handle(), resetPasswordController.resetPasswordProcess);

module.exports = router;