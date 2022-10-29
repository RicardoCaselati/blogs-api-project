const postService = require('../services/post.service');
const categoryService = require('../services/category.service');
const userService = require('../services/user.service');

const createPost = async (req, res) => {
    const { categoryIds } = req.body;
    const categoriesInDB = await categoryService.getCategoryIds();
    const catNewMap = categoriesInDB.map((eachCat) => eachCat.dataValues.id);

    const existingIds = categoryIds.filter((eachCatId) => catNewMap.includes(eachCatId));

    if (categoryIds.length !== existingIds.length) {
        return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }

    const { data: email } = req.user;
    const { dataValues } = await userService.getUserByEmail(email);
    const userId = dataValues.id;

    const date = new Date(Date.now()).toISOString();

    const newData = await postService
        .createPost({ userId, updated: date, published: date, ...req.body });
    return res.status(201).json(newData);
};

const postGetAll = async (_req, res) => {
    try {
        const users = await postService.postGetAll();
        return res.status(200).json(users);
    } catch (e) {
        res.status(500).json({ message: 'Ocorreu um erro' });
    }
};

module.exports = {
    createPost,
    postGetAll,
};