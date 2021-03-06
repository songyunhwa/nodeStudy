const mysql = require('../../mysql');
const pbkdf2Password = require("pbkdf2-password");
const hasher = pbkdf2Password();
const  salt = '###DFDSFSDFSEE4rwersdfsdfR';
const jwt = require("../../module/jwt");

exports.signUp =  (ctx) => {
    const { name, email, password } = ctx.request.body;

    hasher({password : password, salt:salt} ,async function(error,pass,salt,hash){
 
    if(error){
        ctx.body= error ;
    }
      
    var data = await selectUser(email)
    if(data === undefined){
            insert_promise = insertUser(name,email,hash,salt);
            insert_promise.catch(function(error){
                ctx.body = 'insert user error because ' + error;
                console.log('insert user error because ' + error);
            })
    }else {
            ctx.body= 'User already exists' ;
            console.log('User already exists');
    }

})
}

selectUser = (email) => {
    return new Promise( (resolve, reject)=> {
        mysql.getConnection((error, connection)=>{ 
            if(error) throw reject(error);
    connection.query("SELECT * FROM user WHERE email='" + email + "'" ,
    function (error, results, fields) {
    if (error){ 
        reject(error);
    }

    resolve(results[0]);
    });
    });
    });
}

insertUser = (name,email,hash,salt) => {
    return new Promise( (resolve, reject)=> {
        mysql.getConnection((error, connection)=>{ 
            if(error) reject(error);
    connection.query('INSERT INTO user (name, email, password, salt) VALUES(?,?,?,? ) ' , [name, email, hash, salt], function (error, results, fields) {
        if (error) {
            reject(error);
        }

        resolve();
    }); 
});
});
}


Hashing = (password , salt ) => {
    return new Promise((resolve, reject)=> {
    hasher({password:password, salt:salt}, function(err, pass, salt, hash){
        resolve(hash);
    })
});
};

exports.login = async (ctx) => { 
    ctx.set("Access-Control-Allow-Origin", "*");
    const { email, password } = ctx.request.body;
    var data = await selectUser(email, password);
    if(data !== undefined) {
        console.log(data.password);
          var result = await checkJwt(data, data.password);
           ctx.cookies.set('loginToken', result, {maxAge:3000, httpOnly: true});
          ctx.body = result;
    }
     else{
            ctx.body = 'User not exists';
    }
}

checkJwt = (data , password) => {
    return new Promise( async (resolve, reject) => {
        if(data.email.length > 0) {
            const passwd = await jwt.verify(data.password);
                 if(password === password){
                
                    try{
                    // jwt ?????? // ?????????
                    const jwtToken =  await jwt.sign(data);
                    resolve(jwtToken);
                    //ctx.body = data.email;
                    }catch(error){
                        reject("jwt create error because " + error);
                    }
                  }
                
    };
})
}
exports.authCheck = ctx => {
    const token  =ctx.cookies.get('loginToken');
    if( token !== undefined) {
        const decode = jwt.verify(token);
        ctx.body= decode;
        console.log(decode);
    }
}

exports.logout = ctx=> {
    ctx.cookies.set('loginToken', null, {
        maxAge: 0,
        httpOnly: true,
    });
    ctx.status =204;
}


  