// const Joi = require('joi');
const jwtUtil = require('../utils/jwt.util');

// const validateBody = (params) => {
//   const schema = Joi.object({
//     displayName: Joi.string().min(8).required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().min(6).required(),
//     image: Joi.string(),
//   });

//   const { error, value } = schema.validate(params);

//   if (error) return error;

//   return value;
// };

// const validateLogin = async ({ email, password }) => {
//   // SELECT * FROM USERS WHERE EMAIL = XXXXX
//   const user = await User.findOne({ where: { email } });

//   if (!user || user.password !== password) {
//     const e = new Error('Usuário ou senha não válidos!');
//     e.name = ' Não autorizado';
//     throw e;
//   }

//   // const { password: _, ...userWithoutPassword } = user.dataValues;

//   // const token = jwtUtil.createToken(userWithoutPassword);

//   const token = process.env.JWT_SECRET;

//   return token;
// };

const validateToken = (token) => {
  if (!token) {
    const e = new Error('Token obrigatório!');
    e.name = 'Token obrigatório';
    throw e;
  }

  const user = jwtUtil.validateToken(token);

  return user;
};

module.exports = { validateToken };
// module.exports = { validateLogin, validateToken };
// module.exports = { validateBody, validateLogin, validateToken };
// module.exports = { validateBody, validateLogin };