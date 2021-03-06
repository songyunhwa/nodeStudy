const Router = require('koa-router');
const userCtrl = require('./user.ctrl');

const user = new Router();

user.post('/signUp', userCtrl.signUp);
user.post('/login', userCtrl.login);
user.get('/logout', userCtrl.logout);
user.get('/authCheck', userCtrl.authCheck);

module.exports= user;