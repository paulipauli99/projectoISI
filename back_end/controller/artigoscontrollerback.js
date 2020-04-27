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
           // console.log (artigos[12].brand);

           // console.log (artigos);

            res.status(200).send(filtrarArtigos(artigos));     
        })
        .catch((t)=> {
            console.log ("errror");
            console.log (t);
            });   
        });
}

function readInventarioArtigo(req, res) {
    console.log('Ler Inventario');
    var codigo_artigo = req.params.codigo_artigo;
    jasmincontroller.get_token()
    .then ((body) => {
        var r = JSON.parse(body);
        var access_token = r.access_token;
        console.log ('Token Jasmin');

        rp.get({
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + access_token 
            },
            "url": "https://my.jasminsoftware.com/api/233421/233421-0001/materialscore/materialsItems/" + codigo_artigo
            
        })
        .then( (body)=> {
            var inventario = JSON.parse (body);
            console.log("getinventario");
           // console.log(inventario);

            res.status(200).send(filtrarInventario(inventario));
                 
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
                preco:artigo.priceListLines.length>0?artigo.priceListLines[0].priceAmount.amount:0,
                moeda:artigo.priceListLines.length>0?artigo.priceListLines[0].priceAmount.symbol:"",
                //unidade:artigo.priceListLines[0].unit,
                marca:artigo.brand,
                modelo:artigo.brandModel
            }
        }
    );

//console.log("r");
//console.log(r);
return r;

    
}

function filtrarInventario(inventario){
    var armazens = inventario.materialsItemWarehouses.filter(armazem=>armazem.warehouse=="PORTO" || armazem.warehouse=="LISBOA").map(
        armazem => {
            return {
                armazem:armazem.warehouse,
                nome_armazem:armazem.warehouseDescription,
                quantidade: armazem.stockBalance
            }
        }
    );

    var artigo = {
        codigo_artigo: inventario.itemKey,
        nome: inventario.description,
        armazens:armazens
    };

    console.log("filtrarinventario");
    console.log(artigo);
    

    return artigo;

}

module.exports = {
    read: read,
    readInventarioArtigo: readInventarioArtigo
};