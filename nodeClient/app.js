const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const api = require('./api');
const bodyParser =require('koa-bodyparser');


router.use('/api', api.routes()); 

app.use(bodyParser()); // api 값을 parser
app.use(router.routes()).use(router.allowedMethods());



var server = require('http').Server(app);
server.listen(3000, () => {
    console.log('heurm server is listening to port 3000');
});
