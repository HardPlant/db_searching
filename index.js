let express = require('express');
let app = express();
let oracledb = require('oracledb');
let process = require('process');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session')
let cors = require('cors')
    //oracledb.autoCommit = true;
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(session({
    key: "sid",
    secret: "secret",
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
})

var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }
};

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
    let db_request = require('./request.js')(conn);
    app.use('/request', db_request);
    let db_click = require('./click.js')(conn);
    app.use('/click', db_click);


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