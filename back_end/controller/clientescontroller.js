var require = require("request-promise");

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
});


function listar() {
    return require.body
}


module.exports = {
    read: listar
};