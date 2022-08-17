const express = require("express");
const cookie = require("cookie-parser");
const errControler = require("../controllers/errorController");
const userRouter = require("../routes/userRouter");
const paymentRouter = require("../routes/paymentRouter");
const viewRouter = require("../routes/viewRouter");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));

app.use("/api/v1/user/", userRouter);
app.use("/api/v1/payme/", paymentRouter);
app.use("/", viewRouter);
app.use(errControler);

module.exports = app;
