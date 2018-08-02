const express = require('express');
const router = express.Router();

// Middlewares
const redirectIfAuthenticated = require('app/http/middlewares/redirectIfAuthenticated');
const redirectIfNotAdmin = require('app/http/middlewares/redirectIfNotAdmin');

// Admin Router
const adminRouter = require('./admin');
router.use('/admin', redirectIfNotAdmin.handle, adminRouter);

// Home Router
const homeRouter = require('./home');
router.use('/', homeRouter);

// Auth Router
const authRouter = require('./auth');
router.use('/auth', redirectIfAuthenticated.handle, authRouter);

module.exports = router;