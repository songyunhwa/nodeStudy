const user =require('./user');
const board = require('./board');

const Router=require('koa-router');
const api = new Router();


api.use('/user', user.routes());
api.use('/board',board.routes() );

module.exports= api;