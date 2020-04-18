const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('../front_end'));

//app.use('/jasmin', require('./routes/jasmin'));
//app.use('/hubspot', require('./hubspot.js'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Running on port: " + PORT));
module.exports = { app };
require('./routes/artigosroutes.js');
//require('./jasmincontroller.js');
