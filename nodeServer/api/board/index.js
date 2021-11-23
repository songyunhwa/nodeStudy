const Router = require('koa-router');
const boardCtrl = require('./ctrl');
const board = new Router();

board.get('/', boardCtrl.getBoardList);
board.get('/:id', boardCtrl.getBoard);
board.post('/', boardCtrl.saveBoard);
board.put('/:id', boardCtrl.updateBoard);
board.delete('/:id', boardCtrl.deleteBoard);

module.exports= board;