
var mysql = require('../../mysql');

exports.getBoardList = async (ctx) => {
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

exports.saveBoard = (ctx, next) => {
    const { title, content, writerId} = ctx.request.body;
    try{
        this.saveDB(title, content, writerId);
    }catch(error){
        console.log(error);
    }

    console.log("save dashboard success!");
}

saveDB = (title, content, writerId) => {
    mysql.getConnection((error, connection)=>{ 
        if(error) throw error;

    connection.query('INSERT INTO board (title, content, writerId, date) VALUES(?,?,?,? ) ' , [title, content, writerId, new Date()], function (error, results, fields) {
        if (error) throw error;

        console.log(results);
    }); 
    });
};

exports.updateBoard = (ctx, next) => {
    const { id, title, content, writerId} = ctx.request.body;
    try{
        this.updateDB(id, title, content, writerId);
    }catch(error){
        console.log(error);
    }
}

updateDB = (id, title, content, writerId) => {
    mysql.getConnection((error, connection)=>{ 
        if(error) throw error;

    connection.query('UPDATE board SET title= ?, content=? , writerId= ?,  date= ? WHERE id = ? ', [title, content, writerId, new Date(), id], function (error, results, fields) {
        if (error) throw error;

        console.log(results);
    }); 
    });
};


exports.deleteBoard = (ctx, next) => {
    const {id} = ctx.request.body;
    try{
        this.deleteDB(id)
        .then((date) => {
            console.log("save dashboard success!");
        })
        
    }catch(error){
        console.log(error);
    }
}

deleteDB = () =>{

    mysql.getConnection((error, connection)=>{ 
        if(error) throw error;

    connection.query('delete from board where id = ? ' , [id], function (error, results, fields) {
        if (error) throw error;

        console.log(results);
        }); 
    });

};