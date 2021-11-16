
var mysql = require('../../mysql');

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
    const { title, content, writerId} = ctx.request.body;
    var  result = await saveDB(title, content, writerId);
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
    const { id, title, content, writerId} = ctx.request.body;
    const result = await updateDB(id, title, content, writerId);
    ctx.response.body = result;
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


exports.deleteBoard = (ctx, next) => {
    const {id} = ctx.request.body;
    try{
        deleteDB(id);
         ctx.response.body = "save dashboard success!";        
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