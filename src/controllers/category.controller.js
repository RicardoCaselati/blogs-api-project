const categoryService = require('../services/category.service');

const { Category } = require('../models');

const createCategory = async (req, res) => {
  const { name } = req.body;
    
  const category = await Category.findOne({ where: { name } });

  if (category !== null) {
    return res.status(409).json({ message: 'Category already registered' });
  }

  const newCategoryObj = await categoryService.createCategory(req.body);

  return res.status(201).json(newCategoryObj);
};

const categoryGetAll = async (_req, res) => {
  try {
    const users = await categoryService.catagoryGetAll();
    return res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

module.exports = {
    createCategory,
    categoryGetAll,
  };
