const jasmincontroller = require('./jasmincontroller.js');
const rp = require('request-promise');

function read(req, res) {
    console.log('ler');
   
    jasmincontroller.get_token()
    .then ((body) => {
        var r = JSON.parse(body);
        var access_token = r.access_token;
        console.log (access_token);

        rp.get({
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + access_token 
            },
            "url": "https://my.jasminsoftware.com/api/233421/233421-0001/salescore/salesitems"
            
        })
        .then( (body)=> {
            console.log("getartigos");
            //console.log(body);

            var artigos = JSON.parse (body);

            console.log (artigos.length);
            console.log (artigos[12].brand);

           // console.log (artigos);

            res.status(200).send(filtrarArtigos(artigos));     
        })
        .catch((t)=> {
            console.log ("errror");
            console.log (t);
            });

   
    

        });
}

function filtrarArtigos(artigos){
    var r = artigos.filter(artigo => artigo.itemType==1).map(
        artigo => {
            return {
                codigo_artigo:artigo.itemKey,
                nome:artigo.description,
                descricao_completa:artigo.complementaryDescription,
                imagem:artigo.image,
                preco:artigo.priceListLines[0].priceAmount.amount,
                moeda:artigo.priceListLines[0].priceAmount.symbol,
                unidade:artigo.priceListLines[0].unit,
                marca:artigo.brand,
                modelo:artigo.brandModel
            }
        }
    );

console.log("r");
console.log(r);
return r;

    
}

module.exports = {
    read: read
};