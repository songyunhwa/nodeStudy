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

/* CORS 허용 */
app.proxy = true; // true 일때 proxy 헤더들을 신뢰함
app.use(cors());

app.listen(port, function () {
    console.log('Example app listening on port : ' + port);
});

//socket 
// app은 koa module 입니다. 
const httpServer = require('http').createServer();
// socket.io-clinet 와 cors 설정.  
const options = {
cors: {
origin: ['http://localhost:3000'],
methods: ['GET', 'POST'],
},
};
const io = require('socket.io')(httpServer, options);

io.on("connection", (socket) => {      
  console.log("connection success");

  socket.on('join', (room, user) => {
    onJoin(socket, room, user);
});

socket.on('message', (room, data) => {
    io.sockets.in(room).emit("message", { data: data }); 
});
});

httpServer.listen(4042);


function onJoin(socket, room, user) {
    console.log("Joining room: " + room);
    socket.join(room);
    console.log(user + "( " + socket.id + ")" + " now in " + room);

    io.sockets.in(room).emit("message", { data: user + " came in." }); 

}

  
