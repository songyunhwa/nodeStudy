var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',    // 호스트 주소
  user     : 'root',           // mysql user
  password : 'password1234!',       // mysql password
  database : 'node_app'         // mysql 데이터베이스
});
connection.connect();
const pbkdf2Password = require("pbkdf2-password");
const hasher = pbkdf2Password();
const  salt = '###DFDSFSDFSEE4rwersdfsdfR';

exports.signUp = ctx => {
    const { name, email, password } = ctx.request.body;

    hasher({password : password, salt:salt} ,(err,pass,salt,hash)=>{
    if(err){
        console.log(err);
    }
      
    selectUser(email)
    .then((data)=>{
        if(data.length === 0){
            insertUser(name,email,hash,salt);
        }else {
            console.log('User already exists');
        }
    })
    .catch((error)=>{
        console.log("error ocurred", error);
    })
})
}

selectUser = (email) => {
    return new Promise( (resolve, reject)=> {
    connection.query("SELECT * FROM user WHERE email='" + email + "'" ,
    function (error, results, fields) {
    if (error){ 
        reject(error);
    }
    resolve(results[0]);
    });
    });
}

insertUser = (name,email,hash,salt) => {
    connection.query('INSERT INTO user (name, email, password, salt) VALUES(?,?,?,? ) ' , [name, email, hash, salt], function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
        }

        console.log(results);
    }); 
}

exports.login = ctx => {
    const { email, password } = ctx.request.body;
      
    selectUser(email)
    .then((data)=>{
        if(data.length === 1) {
            hasher({password:password, salt:results[0].salt}, function(err, pass, salt, hash){
                if(err){
                    console.log(err);
                    return;
                }
                
                if(hash === results[0].password){
                    return console.log('login success');
                  }
                  return console.log('login failed');
            })
        }else {
            console.log('User not exists');
        }
    })
    .catch((error)=>{
        console.log("error ocurred", error);
    })
    
};


  