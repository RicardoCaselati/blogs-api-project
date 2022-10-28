const categoryService = require('../services/category.service');

// const { createToken } = require('../utils/jwt.util');

const { Category } = require('../models');

const createCategory = async (req, res) => {
  const { name } = req.body;
    
  const category = await Category.findOne({ where: { name } });

  if (category !== null) {
    return res.status(409).json({ message: 'Category already registered' });
  }

  const newCategoryObj = await categoryService.createCategory(req.body);
  console.log(newCategoryObj);
  // const { password: _, ...userWithoutPassword } = newUserData;

  // const token = createToken(userWithoutPassword);

  return res.status(201).json(newCategoryObj);
};

module.exports = {
    createCategory,
  };
