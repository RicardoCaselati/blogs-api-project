const { BlogPost, PostCategory, Category, User } = require('../models');

const createPost = async ({ title, content, userId, published, updated, categoryIds }) => {
    const blogPost = await BlogPost.create({
        title,
        content,
        userId,
        published,
        updated,
    });
    categoryIds.forEach((categoryId) => {
        if (!categoryId) {
            return;
        }
        PostCategory.create({
            postId: blogPost.id,
            categoryId,
        });
    });
    return blogPost;
};

const postGetAll = async () => BlogPost.findAll({
    include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    // attributes: { exclude: ['user_id'] },
});

const postById = (id) => BlogPost.findByPk(id, {
    attributes: { exclude: ['user_id'] },
    include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
    ],
});

module.exports = {
    createPost,
    postGetAll,
    postById,
};
