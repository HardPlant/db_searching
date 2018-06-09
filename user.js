let express = require('express')
let oracledb = require('oracledb');
let router = express.Router();
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

    return router;
}