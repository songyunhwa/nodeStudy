const Koa = require('koa');
const Router = require('koa-router');
const bodyParser =require('koa-bodyparser');

const port = 4041;

const app = new Koa();
const router = new Router();

const api = require('./api');
router.use('/api', api.routes()); 

const middleWare = require('../../nodeApp/nodeServer/module/middleWare');
app.use(middleWare.jwtMiddle); //login 에서 jwt 사용
app.use(bodyParser()); // api 값을 parser
app.use(router.routes()).use(router.allowedMethods());

const cors = require('@koa/cors');
// CORS 옵션
let corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

// CORS 허용
app.proxy = true; // true 일때 proxy 헤더들을 신뢰함
app.use(cors());


const io = require('socket.io');

app.listen(port, function () {
    console.log('Example app listening on port : ' + port);
});

