const {app} = require('../server.js');
const controllerArtigos = require('../controller/artigoscontrollerback.js');

app.get('/artigos',controllerArtigos.read);
app.get('/inventario/:codigo_artigo',controllerArtigos.readInventarioArtigo);
