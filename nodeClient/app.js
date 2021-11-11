const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const api = require('./api');
const bodyParser =require('koa-bodyparser');

router.use('/api', api.routes()); 

app.use(bodyParser()); // api 값을 parser
app.use(router.routes()).use(router.allowedMethods());


const io = require("socket.io-client");
const url = "http://127.0.0.1:4041/api/socket";
const socket = io.connect(url ,{
    path: '/socket.io',
    transports: ['websocket']
});


socket.on('connection', () => { 
    console.log("connection server"); 
});

socket.on('message', function(msg) {
        console.log('서버가 보냄 : ',
        msg.toString());        
});

socket.on('end', function() {
        console.log('서버 연결 종료');
});




app.listen(3000, () => {
    console.log('heurm server is listening to port 3000');
});