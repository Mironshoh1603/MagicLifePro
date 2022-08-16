const express = require("express");
const cookie = require("cookie-parser");
const errControler = require("../controllers/errorController");
const userRouter = require("../routes/userRouter");

const app = express();
app.use(express.json());
app.use(cookie());

app.use("/api/v1/user/", userRouter);
app.use(errControler);

module.exports = app;
