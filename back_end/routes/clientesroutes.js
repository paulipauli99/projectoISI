const { app } = require('../server.js');
const controllerClientes = require('../controller/clientescontroller.js');

app.get('/clientes', controllerClientes.lista);
app.post('/signup', controllerClientes.criar);
app.post('/login', controllerClientes.entrar);
app.get('/logout', controllerClientes.sair);
app.post('/apagarCliente', controllerClientes.apagar);
app.post('/editarCliente', controllerClientes.editar);
app.post('/editarClienteAdmin', controllerClientes.editarAdmin);
app.get('/consultarCliente', controllerClientes.consultarCliente);
app.get('/consultarClienteAdmin', controllerClientes.consultarClienteAdmin);
app.post('/editarAdmin', controllerClientes.editAdmin);