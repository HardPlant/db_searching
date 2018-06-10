let express = require('express')
let oracledb = require('oracledb');
let router = express.Router();
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;
module.exports = function(connection) {
    router.get('/', (req, res) => {
        connection.execute(
            `SELECT * FROM Click`, ).then((result) => {
            console.log(result.rows);
            res.send(JSON.stringify(result.rows));
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500)

        });
    })
    router.get('/:id', (req, res) => {
        let click_id = Number.parseInt(req.params.id);
        connection.execute(
            `SELECT * FROM Click
        WHERE click_id=:click_id`, {
                click_id: { dir: oracledb.BIND_IN, val: click_id, type: oracledb.NUMBER }
            }).then((result) => {
            console.log(result.rows);
            res.send(JSON.stringify(result.rows));
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500)

        });
    })
    router.post('/', (req, res) => {
        let request_id = req.body.request_id;
        let url = req.body.url;
        if (!request_id || !url) return res.sendStatus(404);
        console.log(req.body);

        connection.execute(
            `INSERT INTO Click (request_id, url)
        VALUES(:request_id, :url)`, {
                request_id: { dir: oracledb.BIND_IN, val: request_id, type: oracledb.INT },
                url: { dir: oracledb.BIND_IN, val: url, type: oracledb.STRING }
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