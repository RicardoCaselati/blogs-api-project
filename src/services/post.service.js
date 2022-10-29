const { BlogPost } = require('../models');
const { Category } = require('../models');

const createPost = async (body, userId) => {
    const { title, content, categoryIds } = body;
    BlogPost.create(title, content, userId);
    Category.create(categoryIds);
};

const postGetAll = async () => {
    const posts = await Category.findAll();
    return posts;
};

module.exports = {
    createPost,
    postGetAll,
};
