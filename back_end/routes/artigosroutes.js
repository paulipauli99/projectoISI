const {app} = require('../server.js');
const controllerArtigos = require('../controller/artigoscontrollerback.js');

app.get('/artigos',controllerArtigos.read);
app.get('/inventario/:codigo_artigo',controllerArtigos.readInventarioArtigo);

app.post('/registartigo',controllerArtigos.saveArtigo);

app.post('/saleitem',controllerArtigos.createSaleItem);
app.post('/materialitem',controllerArtigos.createMaterialItem);


app.post('/stinicialporto',controllerArtigos.StockInicialPorto);
app.post('/stiniciallisboa',controllerArtigos.StockInicialLisboa);