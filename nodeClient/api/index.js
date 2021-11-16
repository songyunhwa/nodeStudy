const Router=require('koa-router');
const api = new Router();
const fs = require('fs');

const socketContent = fs.readFileSync('./views/socket.html').toString('utf8')
const rawContent = fs.readFileSync('./views/login.html').toString('utf8')
const boardContent = fs.readFileSync('./views/board.html').toString('utf8')

api.get('/login', (ctx) => (ctx.body =rawContent));
api.get('/socket', (ctx) => (ctx.body =socketContent));
api.get('/boardlist', (ctx) => (ctx.body =boardContent));
module.exports= api;