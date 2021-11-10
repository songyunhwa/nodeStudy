const user =require('./user');
const socket = require('./socket');
const Router=require('koa-router');
const api = new Router();


api.use('/user', user.routes());
api.use('/socket', socket.routes());

module.exports= api;