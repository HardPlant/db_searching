var express = require('express');
var app = express();
var oracledb = require('oracledb');
var process = require('process')

let connection = ""
oracledb.getConnection({
  user:"oracle",
  password: "oracle",
  connectString : "192.168.132.1/XE"
}).then((err, conn)=>{
  if(err) {console.error(err); process.exit(1)}
  connection=conn;
  console.log("Oracle connect Completed")
})

app.get('/test', (req,res)=>{
  connection.execute(
    "SELECT department_id, department_name "
  + "FROM departments "
  + "WHERE department_id < 70 "
  + "ORDER BY department_id"
  ,function(err, result){
    if(err) {console.error(err);res.sendStatus(500)}
    console.log(result.rows);
    res.send(result.rows);
  })
})

app.get('/schedules', (req, res) => {
  res.json({message: 'Welcome to the Server'});
});


app.listen(8081, ()=>{
  console.log('API listening on port 8081');
});