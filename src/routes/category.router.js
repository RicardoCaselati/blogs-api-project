const express = require('express');

const categoryController = require('../controllers/category.controller');
const { validateToken, validateCategoryBody } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', validateCategoryBody, categoryController.createCategory);
router.get('/', validateToken, categoryController.categoryGetAll);

module.exports = router;
