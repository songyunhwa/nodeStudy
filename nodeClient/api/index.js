const Router=require('koa-router');
const api = new Router();
const fs = require('fs');

const socketContent = fs.readFileSync('./views/socket.html').toString('utf8')
const rawContent = fs.readFileSync('./views/login.html').toString('utf8')
const boardListContent = fs.readFileSync('./views/boardList.html').toString('utf8')
const boardContent = fs.readFileSync('./views/board.html').toString('utf8')
const detailContent = fs.readFileSync('./views/detail.html').toString('utf8')

api.get('/login', (ctx) => (ctx.body =rawContent))
api.get('/socket', (ctx) => (ctx.body =socketContent))
api.get('/boardlist', (ctx) => (ctx.body =boardListContent))
api.get('/board' , (ctx) => (ctx.body = boardContent))
api.get('/detail/:id', (ctx) => (ctx.body = detailContent))

module.exports= api;