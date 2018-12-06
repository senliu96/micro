var mysql=require('mysql');
var connection=mysql.createPool({
 
 host:'aa8yerc63y7as1.cfttxzcnynf1.us-east-1.rds.amazonaws.com',
 port:'3306',
 user:'gongqian',
 password:'12345678',
 database:'test'
 
});
 module.exports=connection;