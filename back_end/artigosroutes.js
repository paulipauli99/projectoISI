const {app} = require('./server.js');
const controllerArtigos = require('./artigoscontrollerback.js');

app.get('/artigos',controllerArtigos.read);