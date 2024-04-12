require("./Connection/Conn");
const express = require("express");
const CookieParser = require("cookie-parser");

const app = express();

const InfoRoute = require("./Routers/InfoRoute");

// Setting up CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

app.use(express.json());
app.use(CookieParser());

app.use(InfoRoute);

app.use(Error);

module.exports = app;