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
        const posts = await postService.postGetAll();
        return res.status(200).json(posts);
    } catch (e) {
        res.status(500).json({ message: 'Ocorreu um erro' });
    }
};

const postById = async (req, res) => {
    const { id } = req.params;

    const post = await postService.postById(id);
    if (!post) {
        res.status(404).json({ message: 'Post does not exist' });
    }

    res.status(200).json(post);
};

const postUpdate = async (req, res) => {
    const { id } = req.params;
    const { data: email } = req.user;
    const { dataValues } = await userService.getUserByEmail(email);
    const userId = dataValues.id;

    const postObject = await postService.postById(id);
    const postUserId = postObject.dataValues.userId;

    if (userId !== postUserId) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }

    const postUpdated = await postService.postUpdate(id, req.body);

    if (postUpdated) {
        const updatedObj = await postService.postById(id);
        return res.status(200).json(updatedObj);
    }

    return res.status(404).json({ message: `Post ${id} não encontrado` });
};

const postDelete = async (req, res) => {
    const { id } = req.params;
    const { data: email } = req.user;
    const { dataValues } = await userService.getUserByEmail(email);
    const userLoggedId = dataValues.id;

    const updatedObj = await postService.postById(id);

    if (!updatedObj) {
        return res.status(404).json({ message: 'Post does not exist' });
    }
    
    const usrObjId = updatedObj.dataValues.userId;

    if (userLoggedId === usrObjId) {
        await postService.postDelete(id);
        return res.status(204).json({ message: `Post ${id} removido com sucesso` });
    }
    return res.status(401).json({ message: 'Unauthorized user' });
};

module.exports = {
    createPost,
    postGetAll,
    postById,
    postUpdate,
    postDelete,
};
