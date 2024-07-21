const express = require("express");
 
const app = express();

const loginRouter = require('./api/login/index.js');
const registerRouter = require('./api/register/index.js');

app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);

app.listen(5000, () => {
    console.log('Server started at http://localhost:5000. Refer to README.md to get info about methods.');
});