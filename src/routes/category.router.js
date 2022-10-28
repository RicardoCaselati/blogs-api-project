const express = require('express');

const categoryController = require('../controllers/category.controller');
// const { validateToken } = require('../middlewares/auth.middleware');
const { validateCategoryBody } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', validateCategoryBody, categoryController.createCategory);

module.exports = router;
