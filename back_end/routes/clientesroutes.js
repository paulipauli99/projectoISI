const { app } = require('../server.js');
const controllerClientes = require('../controller/clientescontroller.js');

app.get('/clientes', controllerClientes.lista);
app.post('/signup', controllerClientes.criar);
//app.get('/login', controllerClientes.entrar);