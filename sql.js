var mysql=require('mysql2');
var db=mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'123456',
    database:'cms'
})

db.connect();

module.exports=db;