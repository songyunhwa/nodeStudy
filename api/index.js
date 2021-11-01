const user =require('./user');
const Router=require('koa-router');
const api = new Router();


api.use('/user', user.routes());

module.exports= api;