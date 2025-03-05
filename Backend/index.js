const express = require('express');
const session = require('express-session');
const body_parser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const port = 3000;

app.use(session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(body_parser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});