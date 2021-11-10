const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
    ctx.body = 'Hello Koa';
});



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