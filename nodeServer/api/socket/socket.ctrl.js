
const socketIO = require('socket.io');

exports.socket = (server) => {
    const io = socketIO(server);
 
     io.on('connection', (socket) => {
         const req = socket.request;
         const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
 
         console.log('클라이언트 연결 : ', ip, socket.id);
 
         socket.on('server', (data) => {
             console.log(data);
 
             socket.emit('client','server to client');
         });
 
         socket.on('disconnect', () => {
             console.log('클라이언트 종료 : ', ip, socket.id);
         });
 
         socket.on('error', (error) => {
             console.error(error);
         });
     });
 }