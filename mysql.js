var mysql = require('mysql');
 
module.exports = function () {
  var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password1234!",
    database: "node_app",
  });
 
  return {
    getConnection: function (callback) {    // connection pool을 생성하여 리턴합니다
      pool.getConnection(callback);
    },
    end: function(callback){
      pool.end(callback);
    }
  }
}();