var require = require("request-promise");

var y = [];

function listarClientes(req, res) {
    var options = {
        method: 'GET',
        url: 'https://api.hubapi.com/crm/v3/objects/contacts',
        qs: {
            limit: '100',
            properties: 'nome,telemovel,email,rua,localidade,concelho,distrito,codigo_postal,password,hs_object_id',
            archived: 'false',
            hapikey: '1816e278-334f-4911-b0e1-2f6f3898c900'
        },
        headers: { accept: 'application/json' }
    };
    require(options, function(error, response, body) {
        if (error) throw new Error(error);
        var x = JSON.parse(body).results;

        for (i = 0; i < x.length; i++) {
            a = x[i].properties;
            y[i] = a;
        }
        res.send(y);
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
                password: password,
                admin: "n"
            }
        },
        json: true
    };
    require(options, function(error, response, body) {
        if (error) throw new Error(error);
    });
    return res.redirect('/login.html');
}

function login(req, res) {
    typeof(window) === undefined;
    var emaill = req.body.email;
    var passs = req.body.password;

    var options = {
        method: 'GET',
        url: 'https://api.hubapi.com/crm/v3/objects/contacts',
        qs: {
            limit: '100',
            properties: 'email,password,hs_object_id,admin',
            archived: 'false',
            hapikey: '1816e278-334f-4911-b0e1-2f6f3898c900'
        },
        headers: { accept: 'application/json' }
    };
    require(options, function(error, response, body) {
        if (error) throw new Error(error);
        var x = JSON.parse(body).results;
        console.log(body);
        var y = []
        for (i = 0; i < x.length; i++) {
            a = x[i].properties;
            y[i] = a;
        }
        for (i = 0; i < y.length; i++) {
            if (y[i].email == emaill && y[i].password == passs) {
                if (y[i].admin === "s") {
                    console.log("login sucesso admin");
                    console.log(y[i]);
                    req.session.userId = y[i].hs_object_id;
                    console.log(req.session);
                    return res.redirect('/dashboard.html');
                } else {
                    console.log("login sucesso cliente");
                    console.log(y[i]);
                    req.session.userId = y[i].hs_object_id;
                    console.log(req.session);
                    return res.redirect('/services.html');
                }
            } else {
                if (y.length - 1 == i) {
                    console.log("nenhum contacto com essa correspondencia");
                    return res.redirect('/loginErrado.html');
                }
            }
        }

    })
}

function logout(req, res) {
    console.log(req.session.userId + " logggout")
    req.session.destroy(err => {
        res.clearCookie('sid');
        res.redirect('/index.html');
    })
}

function apagarCliente(req, res) {
    var contactId = req.body.apagarID;

    var options = {
        method: 'DELETE',
        url: 'https://api.hubapi.com/crm/v3/objects/contacts/' + contactId,
        qs: { hapikey: '1816e278-334f-4911-b0e1-2f6f3898c900' },
        headers: { accept: 'application/json' }
    };

    require(options, function(error, response, body) {
        if (error) throw new Error(error);
        console.log("Apagado com sucesso");
        res.redirect('/tableclientes.html');
    });

}

function editarCliente(req, res) {
    var contactId = req.session.userId;
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
        method: 'PATCH',
        url: 'https://api.hubapi.com/crm/v3/objects/contacts/' + contactId,
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
    //res.redirect();
}

function consultarCliente(req, res) {
    var contactId = req.session.userId;

    var options = {
        method: 'GET',
        url: 'https://api.hubapi.com/crm/v3/objects/contacts/' + contactId,
        qs: {
            properties: 'nome,telemovel,email,rua,localidade,concelho,distrito,codigo_postal,password,hs_object_id',
            archived: 'false',
            hapikey: '1816e278-334f-4911-b0e1-2f6f3898c900'
        },
        headers: { accept: 'application/json' }
    };

    require(options, function(error, response, body) {
        if (error) throw new Error(error);
        var x = JSON.parse(body).properties;

        console.log(x);
        console.log(x.email);
        res.send(x);
    });
}

module.exports = {
    lista: listarClientes,
    criar: criarCliente,
    entrar: login,
    sair: logout,
    apagar: apagarCliente,
    editar: editarCliente,
    consultar: consultarCliente
};