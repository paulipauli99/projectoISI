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
        res.send((filtrarCli(clientes)));

    });;

}

function filtrarCli(clientes) {
    var r = clientes;
    var w = []
    for (i = 0; i < r.length; i++) {
        d = r[i].properties;
        w[i] = d;
    }
    return w;

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