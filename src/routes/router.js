const express = require('express');

const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const postRouter = require('./post.router');

const authMiddleware = require('../middlewares/auth.middleware');

const routers = express.Router();

// rota pública
routers.use('/login', authRouter);
routers.use('/user', userRouter);

// rotas privadas - precisar ter feito autenticação (token)
routers.use('/categories', authMiddleware.validateToken, categoryRouter);
routers.use('/post', authMiddleware.validateToken, postRouter);

module.exports = routers;
