const express = require('express');

const authRouter = require('./auth.router');
const userRouter = require('./user.router');

const authMiddleware = require('../middlewares/auth.middleware');

const routers = express.Router();

// rota pública
routers.use('/login', authRouter);
routers.use('/user', userRouter);

routers.use(authMiddleware.validateToken);

// rotas privadas - precisar ter feito autenticação (token)
// routers.use('/courses', courseRouter);
// routers.use('/students', studentRouter);
// routers.use('/modules', moduleRouter);

module.exports = routers;