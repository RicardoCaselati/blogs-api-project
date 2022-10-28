const { Category } = require('../models');

const createCategory = async ({ name }) =>
    Category.create({ name });

const catagoryGetAll = async () => {
    const categories = await Category.findAll();

    return categories;
};

module.exports = {
    createCategory,
    catagoryGetAll,
};
