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
const jwt = require("../../module/jwt");

exports.signUp = ctx => {
    const { name, email, password } = ctx.request.body;

    hasher({password : password, salt:salt} ,(error,pass,salt,hash)=>{
    if(error){
        ctx.body= error ;
    }
      
    var promise = selectUser(email)
    promise.then(function(data){
        if(data === undefined){
            insert_promise = insertUser(name,email,hash,salt);
            insert_promise.catch(function(error){
                ctx.body = 'insert user error because ' + error;
            })
        }else {
            ctx.body= 'User already exists' ;
        }
    })
    .catch(function(error){
        ctx.body=  error;
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
    return new Promise( (resolve, reject)=> {
    connection.query('INSERT INTO user (name, email, password, salt) VALUES(?,?,?,? ) ' , [name, email, hash, salt], function (error, results, fields) {
        if (error) {
            reject(error);
        }

        resolve();
    }); 
});
}

exports.login = (ctx) => { 
    const { email, password } = ctx.request.body;
      
    var promise = selectUser(email);
    promise.then(function (data){
        if(data.email.length > 0) {
            
            hasher({password:password, salt:data.salt}, async function(err, pass, salt, hash){
                if(err){
                    //ctx.body =  err;
                }
                
                else if(hash === data.password){
                    console.log('login success');
                    try{
                    // jwt 생성 // 비동기
                    const jwtToken =  await jwt.sign(data);
                    console.log("jwtToken", jwtToken);

                    //ctx.body = data.email;
                    ctx.cookies.set('loginToken', jwtToken, {maxAge:3000, httpOnly: true});
                    }catch(error){
                        console.log("jwt create error because " + error);
                    }

                  }
                  else {
                      ctx.body= 'login failed' ;
                  }
            })
        }
        if(data === undefined){
            ctx.body = 'User not exists';
        }
    })
    .catch(function(error){
        ctx.body = error;
    })
    
};

exports.authCheck = ctx => {
    const token  =ctx.request.cookies.loginToken;
    if( token !== undefined) {
        const decode = jwt.verify(token);
        ctx.body= decode;
    }
}

exports.logout = ctx=> {
    ctx.cookies.set('loginToken', null, {
        maxAge: 0,
        httpOnly: true,
    });
    ctx.status =204;
}


  