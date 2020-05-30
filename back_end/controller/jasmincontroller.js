const querystring = require("querystring");
const rp = require('request-promise');


//-----PEDIDO DE AUTENTICACAO JASMIN------

function get_token() {

    var form = {
        grant_type: "client_credentials",
        client_id: "F13072A7-87CB-4BE4-A834-35985AC049C8",
        client_secret: "e2f304ec-b731-42e1-a240-290651e1df68",
        scope: "application"
    };

    var formData = querystring.stringify(form);
    var content_length = formData.length;

    return rp.post({
        "headers": {
            "Content-Length": content_length,
            "content-Type": "application/x-www-form-urlencoded"
        },
        "url": "https://identity.primaverabss.com/connect/token",
        "body": formData
    })
}

//---PEDIDO GET ARTIGOS-----com armazem

/*  function getArtigos(){
      

            return get_token()
            .then ((body) => {
            var r = JSON.parse(body);
            var access_token = r.access_token;
            console.log (access_token);

            rp.get({
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + access_token 
                },
                "url": "https://my.jasminsoftware.com/api/233421/233421-0001/materialscore/materialsItems"
                
            });
        })
  }*/


module.exports = {
    // getArtigos:getArtigos,
    get_token: get_token
}