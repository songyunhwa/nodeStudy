const Router = require('koa-router');
const boardCtrl = require('./ctrl');
const board = new Router();

board.get('/', boardCtrl.getBoardList);
board.post('/update', boardCtrl.updateBoard);
board.post('/save', boardCtrl.saveBoard);
board.delete('/', boardCtrl.deleteBoard);

module.exports= board;