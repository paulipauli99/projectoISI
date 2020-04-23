var require = require("request-promise");

function listarClientes(req, res) {
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
        var a = JSON.parse(body).results;
        var w = []
        for (i = 0; i < a.length; i++) {
            d = a[i].properties;
            w[i] = d;
        }
        res.send(w);
    });;
}

function criarCliente(req, res) {
    var nome = req.body.nome;
    var telemovel = req.body.tele;
    var email = req.body.email;
    var rua = req.body.rua;
    var localidade = req.body.local;
    var concelho = req.body.concelho;
    var distrito = req.body.distrito;
    var codigo_postal = req.body.cp;
    var password = req.body.pass;

    var options = {
        method: 'POST',
        url: 'https://api.hubapi.com/crm/v3/objects/contacts',
        qs: { hapikey: '1816e278-334f-4911-b0e1-2f6f3898c900' },
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: {
            properties: {
                nome: nome,
                telemovel: telemovel,
                email: email,
                rua: rua,
                localidade: localidade,
                concelho: concelho,
                distrito: distrito,
                codigo_postal: codigo_postal,
                password: password
            }
        },
        json: true
    };

    require(options, function(error, response, body) {
        if (error) throw new Error(error);
    });
    return res.redirect('http://localhost:8080/login.html');
}

module.exports = {
    lista: listarClientes,
    criar: criarCliente
        //entrar: entrarCliente
};