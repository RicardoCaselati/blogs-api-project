const { Category } = require('../models');

const createCategory = async ({ name }) =>
    Category.create({ name });

const categoryGetAll = async () => {
    const categories = await Category.findAll();

    return categories;
};

const getCategoryIds = async () => {
    const cat = await Category.findAll({ attributes: ['id'] });
    return cat;
};

module.exports = {
    createCategory,
    categoryGetAll,
    getCategoryIds,
};
