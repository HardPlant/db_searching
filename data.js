let express = require('express')
let oracledb = require('oracledb');
let router = express.Router();
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;
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
    router.put('/:id', (req, res) => {
        let data_id = Number.parseInt(req.params.id);
        let title = req.body.title;
        let text = req.body.text;
        let url = req.body.url;
        if (!title && !text && !url) return res.sendStatus(500);

        connection.execute(
            `UPDATE Data SET
            title=:title, text=:text, url=:url
            WHERE data_id=:data_id`, {
                data_id: { dir: oracledb.BIND_IN, val: data_id, type: oracledb.NUMBER },
                title: { dir: oracledb.BIND_IN, val: title, type: oracledb.STRING },
                text: { dir: oracledb.BIND_IN, val: text, type: oracledb.STRING },
                url: { dir: oracledb.BIND_IN, val: url, type: oracledb.STRING }
            }).then((result) => {
            console.log(result.rows);
            res.send(JSON.stringify(result.rows));
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500)
        });
    })
    router.delete('/:id', (req, res) => {
        let data_id = Number.parseInt(req.params.id);
        connection.execute(
            `DELETE FROM Data
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

    router.post('/search', (req, res) => {
        //       let user_id = req.body.user_id;
        let user_id = 1;
        let query = req.body.query;
        console.log(query)
        connection.execute(
            `SELECT * FROM Data WHERE INSTR(title, :query) > 0 OR INSTR(text, :query) > 0`, {
                query: { dir: oracledb.BIND_IN, val: query, type: oracledb.STRING }
            }).then((result) => {
            console.log(result.rows.length);
            console.log(user_id);
            console.log(query);
            connection.execute(
                `INSERT INTO Request (user_id, query, num_results)
            VALUES(:user_id, :query, :num_results)`, {
                    user_id: { dir: oracledb.BIND_IN, val: user_id, type: oracledb.INT },
                    query: { dir: oracledb.BIND_IN, val: query, type: oracledb.STRING },
                    num_results: { dir: oracledb.BIND_IN, val: result.rows.length, type: oracledb.INT }
                }).then((nouse) => {
                console.log(result.rows);
                res.send(JSON.stringify(result.rows));

            }).catch((err) => {
                console.error(`Error at INSERT REQUEST : ${err}`);
                res.sendStatus(500)
            });
        }).catch((err) => {
            console.error(`Error at Python Query : ${err}`);
            res.sendStatus(500)

        });
    })

    return router;
}