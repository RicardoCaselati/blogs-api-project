const sequelize = require('sequelize');

const { Op } = sequelize;
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
});

const postById = (id) => BlogPost.findByPk(id, {
    attributes: { exclude: ['user_id'] },
    include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
    ],
});

const postUpdate = async (id, { title, content }) => BlogPost.update(
    { title, content },
    { where: { id } },
);

const postDelete = async (id) => {
    const qtdRemoved = await BlogPost.destroy({ where: { id } });

    return qtdRemoved > 0;
};

const postSearch = async (query) => {
    const searchedObj = await BlogPost.findAll({
        attributes: { exclude: ['user_id'] },
        where: {
            [Op.or]: [
                { title: { [Op.like]: `%${query}%` } },
                { content: { [Op.like]: `%${query}%` } },
            ],
        },
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });
    return searchedObj;
};

module.exports = {
    createPost,
    postGetAll,
    postById,
    postUpdate,
    postDelete,
    postSearch,
};
