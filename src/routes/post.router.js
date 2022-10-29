const express = require('express');

const postController = require('../controllers/post.controller');
const { validatePostBody, validateToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', validateToken, validatePostBody, postController.createPost);
router.get('/', validateToken, postController.postGetAll);
// router.get('/:id', validateToken, postController.findById);

module.exports = router;
