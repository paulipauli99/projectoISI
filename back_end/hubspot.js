const listarClientes = {
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

const criarCliente = {
    method: 'POST',
    url: 'https://api.hubapi.com/crm/v3/objects/contacts',
    qs: { hapikey: '1816e278-334f-4911-b0e1-2f6f3898c900' },
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: {
        properties: {
            nome: '17',
            telemovel: 'choice_b',
            email: 'option_1',
            rua: 'value',
            localidade: 'chocolate;strawberry',
            concelho: 'false',
            distrito: '1572480000000',
            codigo_postal: '1572480000000',
            password: '1572480000000'
        }
    },
    json: true
};

exports.listarClientes = listarClientes;
exports.criarCliente = criarCliente;