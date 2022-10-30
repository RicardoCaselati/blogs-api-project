const express = require('express');

const userController = require('../controllers/user.controller');
const { validateToken } = require('../middlewares/auth.middleware');
const {
    validateUserBody,
} = require('../middlewares/validation.middleware');

const router = express.Router();

router.post('/', validateUserBody, userController.createUser);
router.get('/', validateToken, userController.usersGetAll);
router.get('/:id', validateToken, userController.findById);
router.delete('/me', validateToken, userController.deleteUser);

module.exports = router;
