const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const api = require('./api');
const bodyParser =require('koa-bodyparser');


router.use('/api', api.routes()); 

app.use(bodyParser()); // api 값을 parser
app.use(router.routes()).use(router.allowedMethods());

var port = 3000;
app.listen(port, function () {
    console.log('Example app listening on port : ' + port);
});

//cors
const cors = require('@koa/cors');
const corsOptions = {
  origin: "http://localhost:4041",
  credentials: true
}
app.use(cors(corsOptions));

/* socket
const io = require("socket.io-client");
const socket = io("http://localhost:4042");
*/

