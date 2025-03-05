const session = require('express-session'); 
const express  = require('express');
const body_parser = require('body-parser');
const userRouter = require('./routers/user.router');
const app = express();

app.use(session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(body_parser.json());

app.use('/',userRouter);

module.exports =app;