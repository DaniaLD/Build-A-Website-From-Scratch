const express = require('express');
const router = express.Router();

// Controllers
const adminController = require('app/http/controllers/admin/adminController');
const coursesController = require('app/http/controllers/admin/coursesController');

// Validators
const courseValidator = require('app/http/validators/courseValidator');

router.use((req, res, next) => {
    res.locals.layout = 'admin/master';
    next();
});

// Admin Routes => Has /admin prefix
router.get('/', adminController.index);
router.get('/courses', coursesController.index);
router.get('/courses/create', coursesController.create);
router.post('/courses/create', courseValidator.handle(), coursesController.store);

module.exports = router;