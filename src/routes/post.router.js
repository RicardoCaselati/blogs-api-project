const express = require('express');

const postController = require('../controllers/post.controller');
const {
    validatePostBody,
    validateUpdatePostBody,
} = require('../middlewares/validation.middleware');

const router = express.Router();

router.get('/search', postController.postSearch);

router.post('/', validatePostBody, postController.createPost);
router.get('/', postController.postGetAll);
router.get('/:id', postController.postById);
router.put('/:id', validateUpdatePostBody, postController.postUpdate);
router.delete('/:id', postController.postDelete);

module.exports = router;
