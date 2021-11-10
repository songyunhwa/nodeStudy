const Koa = require('koa');
const Router = require('koa-router');
const bodyParser =require('koa-bodyparser');

const port = 4041;

const app = new Koa();
const router = new Router();

const api = require('./api');
router.use('/api', api.routes()); 

const middleWare = require('../../nodeApp/nodeServer/module/middleWare');
app.use(middleWare.jwtMiddle);
app.use(bodyParser()); // api 값을 parser
app.use(router.routes()).use(router.allowedMethods());


const io = require('socket.io');

app.listen(port, function () {
    console.log('Example app listening on port : ' + port);
});

