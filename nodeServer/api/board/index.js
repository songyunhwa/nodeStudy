const Router = require('koa-router');
const boardCtrl = require('./ctrl');
const board = new Router();

board.get('/', boardCtrl.getBoardList);
board.get('/:id', boardCtrl.getBoard);
board.post('/', boardCtrl.updateBoard);
board.put('/:id', boardCtrl.saveBoard);
board.delete('/:id', boardCtrl.deleteBoard);

module.exports= board;