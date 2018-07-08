const express = require('express');
const router = express.Router();

// Controllers
const adminController = require('app/http/controllers/admin/adminController');

// Admin Routes => Has /admin prefix
router.get('/', adminController.index);
router.get('/courses', adminController.courses);

module.exports = router;