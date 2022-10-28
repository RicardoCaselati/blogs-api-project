// const { User, BlogPost } = require('../models');
const { User } = require('../models');

const createUser = async ({ displayName, email, password, image }) =>
  User.create({ displayName, email, password, image });

const usersGetAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return users;
};

const findById = (id) => User.findByPk(id);

module.exports = {
  createUser,
  usersGetAll,
  findById,
};