const Router = require('koa-router');
const socketCtrl = require('./socket.ctrl');

const socket = new Router();

socket.get('/', socketCtrl.socket);

module.exports=socket;