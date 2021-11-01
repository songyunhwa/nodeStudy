var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',    // 호스트 주소
  user     : 'root',           // mysql user
  password : 'password1234!',       // mysql password
  database : 'node_app'         // mysql 데이터베이스
});
connection.connect();

exports.signUp = async ctx => {
    const { name, email, password } = ctx.request.body;
    
    connenction.query('INSERT INTO users SET ?' , users, function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code" : 400,
                "failed": "error ocurred"
            })
        } else {
            console.log('The solution is: ', results);
            res.send({
                "code": 200,
                "success": "user registered sucessfully"
            });
        }
    });    
}
// Create a MySQL connection pool (do this once)


exports.login = async ctx => {
    const { email, password } = ctx.request.body;
 
      
        connection.query("SELECT * FROM user WHERE email='" + email + "'" ,
                function (error, results, fields) {
                if (error){ 
                    connection.end();
                    throw error;
                }
                console.log(results);
            });
    
  };


  