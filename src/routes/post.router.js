const express = require('express');

const postController = require('../controllers/post.controller');
const {
    validatePostBody,
    validateToken,
    validateUpdatePostBody,
} = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', validateToken, validatePostBody, postController.createPost);
router.get('/', validateToken, postController.postGetAll);
router.get('/:id', postController.postById);
router.put('/:id', validateUpdatePostBody, postController.postUpdate);
router.delete('/:id', postController.postDelete);

module.exports = router;
