const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const querystring = require ("querystring");
const rp = require('request-promise');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static('../front_end'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Running on: http://localhost:" + PORT + "/"));

module.exports = { app };

require('./routes/artigosroutes.js');
require('./routes/clientesroutes.js');