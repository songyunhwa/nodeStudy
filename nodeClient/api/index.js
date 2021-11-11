const Router=require('koa-router');
const api = new Router();
const fs = require('fs');
const rawContent = fs.readFileSync('./views/login.html').toString('utf8')

//http://localhost:3000/api/login
api.get('/login', (ctx) => (ctx.body = rawContent ));

module.exports= api;