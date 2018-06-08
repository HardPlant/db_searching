var express = require('express');
var app = express();
var oracledb = require('oracledb');
var process = require('process')

let connection = ""
oracledb.getConnection({
    user: "oracle",
    password: "oracle",
    connectString: "localhost/XE"
}, (err, conn) => {
    if (err) {
        console.log("DB 연결 에러 발생!");
        console.error(err);
        process.exit(1)
    }
    connection = conn;
    console.log("Oracle connect Completed")
});

app.get('/test', (req, res) => {
    connection.execute(
        `SELECT * FROM DEPT`,
        function(err, result) {
            if (err) {
                console.error(err);
                res.sendStatus(500)
            }
            console.log(result.rows);
            res.send(result.rows);
        });
})
app.get('/test2', (req, res) => {
    connection.execute(
        `SELECT * FROM usr`,
        function(err, result) {
            if (err) {
                console.error(err);
                res.sendStatus(500)
            }
            console.log(result.rows);
            res.send(result.rows);
        });
})
app.get('/schedules', (req, res) => {
    res.json({ message: 'Welcome to the Server' });
});


app.listen(8085, () => {
    console.log('API listening on port 8085');
});