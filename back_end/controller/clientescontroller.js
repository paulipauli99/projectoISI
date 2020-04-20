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
        var a = JSON.parse(body).results;
        var w = []
        for (i = 0; i < a.length; i++) {
            d = a[i].properties;
            w[i] = d;
        }

        console.log(w);
        res.send(w);
    });;

}



function criarCliente() {
    var request = require("request");

    var options = {
        method: 'POST',
        url: 'https://api.hubapi.com/crm/v3/objects/contacts',
        qs: { hapikey: '1816e278-334f-4911-b0e1-2f6f3898c900' },
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: {
            properties: {
                property_number: '17',
                property_dropdown: 'choice_b',
                property_radio: 'option_1',
                property_string: 'value',
                property_multiple_checkboxes: 'chocolate;strawberry',
                property_checkbox: 'false',
                property_date: '1572480000000'
            }
        },
        json: true
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
}

module.exports = {
    lista: filtarClientes,
    criar: criarCliente
        //entrar: entrarCliente
};