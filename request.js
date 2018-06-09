let express = require('express')
let oracledb = require('oracledb');
let router = express.Router();
module.exports = function(connection) {
    router.get('/', (req, res) => {
        connection.execute(
            `SELECT * FROM Request`, ).then((result) => {
            console.log(result.rows);
            res.send(JSON.stringify(result.rows));
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500)

        });
    })
    router.get('/:id', (req, res) => {
        let user_id = Number.parseInt(req.params.id);
        connection.execute(
            `SELECT * FROM Request
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

    return router;
}