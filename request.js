let express = require('express')
let oracledb = require('oracledb');
let router = express.Router();
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;
module.exports = function(connection) {
    router.get('/', (req, res) => {
        connection.execute(
            `SELECT Request.request_id,Request.time,usr.name,usr.user_id, Request.query,Request.num_results
            FROM Request
            INNER JOIN usr ON Request.user_id = usr.user_id`, ).then((result) => {
            console.log(result.rows);
            res.send(JSON.stringify(result.rows));
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500)

        });
    })
    router.get('/current', (req, res) => {
        connection.execute(`SELECT Request_Sequence.CURRVAL FROM dual`, ).then((number) => {
            console.log("CURRVAL");
            console.log(number.rows);
            res.send(number.rows);
        })
    })
    return router;

    router.get('/:id', (req, res) => {
        if (req.param.id == "current") return;
        let user_id = Number.parseInt(req.params.id);
        connection.execute(
            `SELECT Request.request_id,Request.time,usr.name,Request.query,Request.num_results
            FROM Request
                INNER JOIN usr ON Request.user_id = usr.user_id`, {
                user_id: { dir: oracledb.BIND_IN, val: user_id, type: oracledb.NUMBER }
            }).then((result) => {
            console.log(result.rows);
            res.send(JSON.stringify(result.rows));
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500)
        });
    })
    router.post('/', (req, res) => {
        let time = req.body.time;
        let user_id = req.body.user_id;
        let query = req.body.query;
        let num_results = req.body.num_results;
        if (!time || !user_id || !query) return res.sendStatus(404);
        console.log(req.body);

        connection.execute(
            `INSERT INTO Request (time, user_id, query, num_results)
        VALUES(:time, :user_id, :query)`, {
                time: { dir: oracledb.BIND_IN, val: time, type: oracledb.DATE },
                user_id: { dir: oracledb.BIND_IN, val: user_id, type: oracledb.INT },
                query: { dir: oracledb.BIND_IN, val: query, type: oracledb.STRING },
                num_results: { dir: oracledb.BIND_IN, val: num_results, type: oracledb.INT }
            }).then((result) => {
            console.log(result.rows);
            res.sendStatus(200);
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500)

        });
    })
    router.delete('/:id', (req, res) => {
        let request_id = Number.parseInt(req.params.id);
        connection.execute(
            `DELETE FROM Request
        WHERE request_id=:request_id`, {
                request_id: { dir: oracledb.BIND_IN, val: request_id, type: oracledb.NUMBER }
            }).then((result) => {
            console.log(result.rows);
            res.send(JSON.stringify(result.rows));
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500)

        });
    })
}