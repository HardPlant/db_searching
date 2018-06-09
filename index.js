let express = require('express');
let app = express();
let oracledb = require('oracledb');
let process = require('process')
let bodyParser = require('body-parser')
    //oracledb.autoCommit = true;
app.use(bodyParser.json());


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
    console.log("Oracle connect Completed")

    let db_user = require('./user.js')(conn);
    app.use('/user', db_user);
    let db_data = require('./data.js')(conn);
    app.use('/data', db_data);

    app.get('/test', (req, res) => {
        connection.execute(`SELECT * FROM DEPT`).then((result) => {
            console.log(result.rows);
            res.send(result.rows);
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500)

        });
    })

    app.listen(8085, () => {
        console.log('API listening on port 8085');
    });
});