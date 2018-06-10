let express = require('express')
let oracledb = require('oracledb');
let router = express.Router();
oracledb.outFormat = oracledb.OBJECT;
module.exports = function(connection) {
    router.get('/', (req, res) => {
        let user_id = Number.parseInt(req.params.id);
        connection.execute(
            `SELECT * FROM usr`, ).then((result) => {
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
            `SELECT * FROM usr
        WHERE user_id=:user_id`, {
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
        let name = req.body.name;
        let email = req.body.email;
        let country = req.body.country;
        if (!name || !email || !country) return res.sendStatus(404);
        console.log(req.body);

        connection.execute(
            `INSERT INTO usr (name, email, country)
        VALUES(:name, :email, (SELECT country_id FROM Country WHERE name = :country))`, {
                name: { dir: oracledb.BIND_IN, val: name, type: oracledb.STRING },
                email: { dir: oracledb.BIND_IN, val: email, type: oracledb.STRING },
                country: { dir: oracledb.BIND_IN, val: country, type: oracledb.STRING }
            }).then((result) => {
            console.log(result.rows);
            res.sendStatus(200);
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500)

        });
    })
    router.put('/:id', (req, res) => {
        let user_id = Number.parseInt(req.params.id);
        let name = req.body.name;
        let email = req.body.email;
        let country = req.body.country;
        if (!name || !email || !country) return res.sendStatus(404);

        connection.execute(
            `UPDATE usr SET
            name=:name, email=:email, country=:country
            WHERE user_id=:user_id`, {
                user_id: { dir: oracledb.BIND_IN, val: user_id, type: oracledb.NUMBER },
                name: { dir: oracledb.BIND_IN, val: name, type: oracledb.STRING },
                email: { dir: oracledb.BIND_IN, val: email, type: oracledb.STRING },
                country: { dir: oracledb.BIND_IN, val: country, type: oracledb.NUMBER }
            }).then((result) => {
            console.log(result.rows);
            res.send(JSON.stringify(result.rows));
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500)
        });
    })
    router.delete('/:id', (req, res) => {
        let user_id = Number.parseInt(req.params.id);
        connection.execute(
            `DELETE FROM usr
        WHERE user_id=:user_id`, {
                user_id: { dir: oracledb.BIND_IN, val: user_id, type: oracledb.NUMBER }
            }).then((result) => {
            console.log(result.rows);
            res.send(JSON.stringify(result.rows));
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500)

        });
    })
    router.post('/login', (req, res) => {
        let name = req.body.name;
        let email = req.body.email;
        if (!name || !email || !country) return res.sendStatus(404);
        console.log(req.body);

        connection.execute(
            `SELECT * FROM usr
        WHERE name=:name, email=:email`, {
                name: { dir: oracledb.BIND_IN, val: name, type: oracledb.STRING },
                email: { dir: oracledb.BIND_IN, val: email, type: oracledb.STRING }
            }).then((result) => {
            if (result.rows.length == 0) return res.sendStatus(404);
            else {
                res.send({
                        user_id: result.rows[0][user_id],
                        name: result.rows[0][name]
                    })
                    //req.session.user_id = result.rows[0][user_id];
                    //req.session.name = result.rows[0][name];
            }
        }).catch((err) => {
            console.error(err);
            res.sendStatus(500)

        });
    })
    return router;
}