const { reject } = require('async');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',    // 호스트 주소
  user     : 'test',           // mysql user
  password : 'test',       // mysql password
  database : 'node_app'         // mysql 데이터베이스
});
connection.connect();
const pbkdf2Password = require("pbkdf2-password");
const hasher = pbkdf2Password();
const  salt = '###DFDSFSDFSEE4rwersdfsdfR';

exports.signUp = ctx => {
    const { name, email, password } = ctx.request.body;

    hasher({password : password, salt:salt} ,(error,pass,salt,hash)=>{
    if(error){
        ctx.response.body= error ;
    }
      
    var promise = selectUser(email)
    promise.then(function(data){
        if(data === undefined){
            insert_promise = insertUser(name,email,hash,salt);
            insert_promise.catch(function(error){
                ctx.response.body = error;
            })
        }else {
            ctx.response.body= 'User already exists' ;
        }
    })
    .catch(function(error){
        ctx.response.body=  error;
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
    console.log("selectUser " + results[0]);
    resolve(results[0]);
    });
    });
}

insertUser = (name,email,hash,salt) => {
    return new Promise( (resolve, reject)=> {
    connection.query('INSERT INTO user (name, email, password, salt) VALUES(?,?,?,? ) ' , [name, email, hash, salt], function (error, results, fields) {
        if (error) {
            reject(error);
        }

        console.log('user insert success');
    }); 
});
}

exports.login = (ctx) => {
    const { email, password } = ctx.request.body;

    /*
    if(ctx.request.cookies.loginToken !== undefined) {
        ctx.response.body= 'already login' });
        return;
    }*/
      
    var promise = selectUser(email);
    promise.then((data)=>{
        console.log("in " + data);
        if(data !== undefined) {
            hasher({password:password, salt:results[0].salt}, function(err, pass, salt, hash){
                if(err){
                    ctx.response.json({ message:  err });
                    return;
                }
                
                console.log(data);
                if(hash === data.paassword){/*
                    // jwt 생성
                    const jwtToken = await jwt.sign(user);
                    res.cookie('loginToken', jwtToken, {maxAge:3000});
                    return res.status(statusCode.OK).send(util.success(statusCode.OK, "login success", {
                         accessToken: jwtToken.token
                     }));*/
                  }
                  return ctx.response.body= 'login failed' ;
            })
        }else {
            ctx.response.body= 'User not exists' ;
        }
    })
    .catch((error)=>{
        ctx.response.body= error ;
    })
    
};

exports.logout = ctx=> {
    ctx.response.body.clearCookie('loginToken');
}


  