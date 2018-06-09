let express = require('express')
let oracledb = require('oracledb');
let router = express.Router();
module.exports = function(connection) {
    router.get('/', (req, res) => {
        connection.execute(
            `SELECT * FROM Data`, ).then((result) => {
            console.log(result.rows);
            res.send(JSON.stringify(result.rows));
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500)

        });
    })
    router.get('/:id', (req, res) => {
        let data_id = Number.parseInt(req.params.id);
        connection.execute(
            `SELECT * FROM Data
        WHERE data_id=:data_id`, {
                data_id: { dir: oracledb.BIND_IN, val: data_id, type: oracledb.NUMBER }
            }).then((result) => {
            console.log(result.rows);
            res.send(JSON.stringify(result.rows));
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500)

        });
    })
    router.post('/', (req, res) => {
        let title = req.body.title;
        let text = req.body.text;
        let url = req.body.url;
        if (!title || !text || !url) return res.sendStatus(404);
        console.log(req.body);

        connection.execute(
            `INSERT INTO Data (title, text, url)
        VALUES(:title, :text, :url)`, {
                title: { dir: oracledb.BIND_IN, val: title, type: oracledb.STRING },
                text: { dir: oracledb.BIND_IN, val: text, type: oracledb.STRING },
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