const sqlite3 = require('sqlite3');
const crypt = require('crypto-js');
const express = require('express');

const db = new sqlite3.Database("./db/users.db");

const registerRouter = express.Router();
registerRouter.use(express.json());

registerRouter.post("/", (req, response) => {
    let pass = '';
    if(!req.body) response.sendStatus(400);
    if(req.body.password == undefined || req.body.password == '') pass == undefined;
    else pass = crypt.MD5(req.body.password).toString();

    const register = query => new Promise((resolve, reject) => {
        if(req.body.username == undefined || req.body.username == '') reject('No username is provided');
        else if(req.body.password == undefined || req.body.password == '' || pass == undefined) reject('No password is provided');
        else db.run(query, (err, res) => {
            if(err) {
                if(err.message.includes('UNIQUE')) reject('User already exists');
                else reject(err);
            }
            else resolve(res);
        });
    });

    register(`INSERT INTO users (username, pass) VALUES ('${req.body.username}', '${pass}')`).then(res => {
        response.json({register: 'ok'});
        console.log(`Exited with HTTP 200. New user: ${req.body.username}`);
    }).catch(err => {
        switch(err) {
            case 'No username is provided':
                response.status(400).json({register: 'fail', reason: 'no username is provided'});
                console.log(`Exited with HTTP 400. Reason: No username is provided`);
                break;
            case 'No password is provided':
                response.status(400).json({register: 'fail', reason: 'no password is provided'});
                console.log(`Exited with HTTP 400. Reason: No password is provided`);
                break;
            case 'User already exists':
                response.status(409).json({register: 'fail', reason: 'user already exists'});
                console.log(`Exited with HTTP 409. Reason: User already exists`);
                break;
            default:
                response.status(500).json({register: 'fail', reason: `${err}`});
                console.log(`Exited with HTTP 500. Reason: ${err}`);
                break;
        }
    });
});

module.exports = registerRouter;