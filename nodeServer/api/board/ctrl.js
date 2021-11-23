
var mysql = require('../../mysql');
const jwt = require("../../module/jwt");
exports.getBoard = async (ctx) => {
    const { id } = ctx.params;

    ctx.set("Access-Control-Allow-Origin", "*");
    const data = await getBoardDB(id);
    
    ctx.response.body=data;
    console.log(ctx.response.body);

}

getBoardDB = (id) => {
    return new Promise((resolve, reject) => {
    mysql.getConnection( (error, connection)=>{ 
        if(error) reject(error);
       
     connection.query('SELECT * FROM board WHERE id = ?', [id] , function (error, results, fields) {
        if (error) ctx.body = error;
        
        resolve(results[0]);
      });
    });
});
}

exports.getBoardList = async (ctx) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    const data = await getBoardListDB();
    
    ctx.response.body=data;
    console.log(ctx.response.body);

}

getBoardListDB = () => {
    return new Promise((resolve, reject) => {
    var data = [];
    mysql.getConnection( (error, connection)=>{ 
        if(error) reject(error);
       
     connection.query('SELECT * FROM board', function (error, results, fields) {
        if (error) ctx.body = error;
        
        results.forEach(result => {
            data.push(result);
        });
        
        resolve(data);
      });
    });
});
}

exports.saveBoard = async (ctx, next) => {
    const { title, content} = ctx.request.body;

    const token  =ctx.cookies.get('loginToken');
    if(token == null) {ctx.body = "login required"; return; }
    const decode = await jwt.verify(token);
    if(decode == null) {ctx.body = "login required"; return; }
    var  result = await saveDB(title, content, decode.id);
    ctx.response.body = result;
}

saveDB = (title, content, writerId) => {
    return new Promise((resolve, reject) => {
    mysql.getConnection((error, connection)=>{ 
        if(error) reject(error);

    connection.query('INSERT INTO board (title, content, writerId, date) VALUES(?,?,?,? ) ' , [title, content, writerId, new Date()], function (error, results, fields) {
        if (error) reject(error);

        resolve(results);
    }); 
    });
    });
};

exports.updateBoard = async (ctx, next) => {
    const {id} = ctx.request.params;
    const { title, content} = ctx.request.body;

    const token  =ctx.cookies.get('loginToken');
    if(token == null) ctx.body = "login required";
    const decode = await jwt.verify(token);

    const data = await getBoardDB(id);

    if(decode.id == data.writerId) {
        const result = await updateDB(id, title, content, decode.id);
        ctx.response.body = result;
    }
    else ctx.body = "writer id is not equal."
}

updateDB = (id, title, content, writerId) => {
    return new Promise((resolve, reject) => {
    mysql.getConnection((error, connection)=>{ 
        if(error) reject(error);

    connection.query('UPDATE board SET title= ?, content=? , writerId= ?,  date= ? WHERE id = ? ', [title, content, writerId, new Date(), id], function (error, results, fields) {
        if (error) reject(error);

        resolve(results);
    }); 
    });
});
};


exports.deleteBoard = async (ctx, next) => {
    const {id} = ctx.request.params;
    
    try{
        const token  =ctx.cookies.get('loginToken');
        if(token == null) ctx.body = "login required";
        const decode = await jwt.verify(token);

        const data = await getBoardDB(id);
        
        if(decode.id == data.writerId) {
            deleteDB(id);
            ctx.response.body = "save dashboard success!";       
        }
        
    }catch(error){
        ctx.response.body = error;
    }
}

deleteDB = (id) =>{

    mysql.getConnection((error, connection)=>{ 
        if(error) throw error;

    connection.query('delete from board where id = ? ' , [id], function (error, results, fields) {
        if (error) throw error;

        console.log(results);
        }); 
    });

};