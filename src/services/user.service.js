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

const findById = async (id) => User.findAll({
  where: { id }, 
  attributes: { exclude: ['password'] },
});

const getUserByEmail = (email) => User.findOne({ where: { email } });

const deleteUser = async (id) => {
  const userRemoved = await User.destroy({ where: { id } });

  return userRemoved > 0;
};

module.exports = {
  createUser,
  usersGetAll,
  findById,
  getUserByEmail,
  deleteUser,
};