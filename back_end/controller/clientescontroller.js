var require = require("request-promise");

function filtarClientes(req, res) {
    var options = {
        method: 'GET',
        url: 'https://api.hubapi.com/crm/v3/objects/contacts',
        qs: {
            limit: '100',
            properties: 'nome,telemovel,email,rua,localidade,concelho,distrito,codigo_postal,password',
            archived: 'false',
            hapikey: '1816e278-334f-4911-b0e1-2f6f3898c900'
        },
        headers: { accept: 'application/json' }
    };
    require(options, function(error, response, body) {
        if (error) throw new Error(error);
        var a = body;
        var b = JSON.parse(a);
        var clientes = b.results;
        console.log((filtrarCli(clientes)));
        res.send((filtrarCli(clientes)).properties);

    });;

}

function filtrarCli(clientes) {
    var r = clientes.filter(cliente => cliente.itemType).map(
        cliente => {
            return { //pegar no primeiro, só propriedades, adicionar num nova array!!!!!!!!!!!
                nome: cliente.nome,
                telemovel: cliente.telemovel,
                email: cliente.email,
                rua: cliente.rua,
                localidade: cliente.localidade,
                concelho: cliente.concelho,
                distrito: cliente.distrito,
                codigo_postal: cliente.codigo_postal,
                password: cliente.password
            }
        }
    );
    return r;

}

module.exports = {
    read: filtarClientes
};


/*
for (i = 0; i < c.length; i++) {
    d = c[i].properties;
    console.log(d);
}
*/