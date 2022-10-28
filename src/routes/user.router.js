const express = require('express');

const userController = require('../controllers/user.controller');
const { validateBody, validateToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', validateBody, userController.createUser);
router.get('/', validateToken, userController.usersGetAll);
router.get('/:id', validateToken, userController.findById);

module.exports = router;
