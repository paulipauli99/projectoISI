const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const querystring = require("querystring");
const rp = require('request-promise');
const session = require('express-session');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: '../front_end/upload/',
    filename: function(req, file, cb) {
        console.log('storage');
        console.log(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }
}).single('myImage');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('../front_end'));
app.use(cors());
app.use(session({
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: `it's a secret!`,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        sameSite: true,
        secure: process.env.NODE_ENV === 'production'
    }
}));


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Running on: http://localhost:" + PORT + "/"));

module.exports = { app, upload };

require('./routes/artigosroutes.js');
require('./routes/clientesroutes.js');