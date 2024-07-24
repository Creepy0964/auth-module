const express = require("express");

const app = express();

const authRouter = require("./api/auth/index.js");
// const usersRouter = require("./api/users/index.js");
// reserved for future use in local project

app.use("/api/auth", authRouter);
// app.use("/api/users", usersRouter);
// reserved for future use in local project

app.listen(5000, () => {
  console.log(
    "Server started at http://localhost:5000. Refer to README.md to get info about methods.",
  );
});
