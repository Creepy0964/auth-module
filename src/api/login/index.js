const sqlite3 = require('sqlite3');
const express = require('express');
const crypt = require('crypto-js');

const db = new sqlite3.Database("./db/users.db");

let loginRouter = express.Router();

loginRouter.use(express.json());

loginRouter.post("/", (req, response) => {
    if(!req.body) response.sendStatus(400);
    let pass = crypt.MD5(req.body.password).toString();

    const login = query => new Promise((resolve, reject) => {
        db.get(query, (err, res) => {
            if(err) {
                if(err.message.includes('no such table')) reject('Im a teapot');
            }
            else resolve(res);
        });
    });

    login(`SELECT pass FROM users WHERE username='${req.body.username}'`).then(res => {
        if(res == undefined) {
            response.status(401).json({login: 'fail', reason: 'user not found'});
            console.log('Exited with HTTP 401. Reason: User not found');
        }
        else if(pass != res.pass) {
            response.status(401).json({login: 'fail', reason: 'incorrect password'});
            console.log(`Exited with HTTP 401. Reason: Incorrect password`);
        }
        else {
            response.json({login: 'ok'}); 
            console.log(`Exited with HTTP 200. Authentificated with credentials of ${req.body.username}`);
        }
    }).catch(err => {
        switch(err) {
            case 'Im a teapot':
                response.status(418).json({login: 'fail', reason: 'Im a teapot'});
                console.log(`Exited with HTTP 418. Reason: Oh no, our database... its broken... :skull:`);
                break;
            
        }
    });
});

module.exports = loginRouter;