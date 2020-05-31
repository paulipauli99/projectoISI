const { app, upload } = require('../server.js');
const controllerArtigos = require('../controller/artigoscontrollerback.js');

app.get('/artigos', controllerArtigos.read);

app.get('/artigo/:codigo_artigo', controllerArtigos.readArtigo);

app.get('/inventario/:codigo_artigo', controllerArtigos.readInventarioArtigo);

app.get('/marcas', controllerArtigos.getMarcas);
app.get('/modelos', controllerArtigos.getModelos);

app.post('/registartigo', controllerArtigos.saveArtigo);

app.post('/saleitem', controllerArtigos.createSaleItem);
app.post('/materialitem', controllerArtigos.createMaterialItem);


app.post('/stinicialporto', controllerArtigos.StockInicialPorto);
app.post('/stiniciallisboa', controllerArtigos.StockInicialLisboa);

app.post('/upload', controllerArtigos.uploadImagem);

app.get('/desativarArtigo/:codigo_artigo', controllerArtigos.desativarArtigo);

app.put('/alterarnome/:codigo_artigo', controllerArtigos.alterarNome);
app.put('/alterardescricao/:codigo_artigo', controllerArtigos.alterarDescricao);
app.put('/alterarpreco/:codigo_artigo/:lineID', controllerArtigos.alterarPreco);

app.post('/editarstocklisboa', controllerArtigos.editarStockLisboa);
app.post('/editarstockporto', controllerArtigos.editarStockPorto);