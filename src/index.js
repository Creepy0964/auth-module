const express = require("express");
 
const app = express();

const authRouter = require('./api/auth/index.js');

app.use('/api/auth', authRouter);

app.listen(5000, () => {
    console.log('Server started at http://localhost:5000. Refer to README.md to get info about methods.');
});