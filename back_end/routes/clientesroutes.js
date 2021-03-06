const { app } = require('../server.js');
const controllerClientes = require('../controller/clientescontroller.js');

app.get('/clientes', controllerClientes.lista);
app.post('/signup', controllerClientes.criar);
app.post('/login', controllerClientes.entrar);
app.get('/logout', controllerClientes.sair);
app.post('/apagarCliente', controllerClientes.apagar);
app.post('/editarCliente', controllerClientes.editar);
app.get('/consultarCliente', controllerClientes.consultar);
app.post('/editarAdmin', controllerClientes.edit);
app.get('/sessionCheck', controllerClientes.session);