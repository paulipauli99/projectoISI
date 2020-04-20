const { app } = require('../server.js');
const controllerClientes = require('../controller/clientescontroller.js');

app.get('/clientes', controllerClientes.lista);
app.get('/signup', controllerClientes.criar);
//app.get('/login', controllerClientes.entrar);