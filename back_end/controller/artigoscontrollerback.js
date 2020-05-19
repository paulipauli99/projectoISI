const jasmincontroller = require('./jasmincontroller.js');
const rp = require('request-promise');
var formData = require('form-data');
const multer = require('multer');
const { upload } = require('../server.js');

function read(req, res) {
    console.log('ler');

    jasmincontroller.get_token()
        .then((body) => {
            var r = JSON.parse(body);
            var access_token = r.access_token;
            //console.log (access_token);

            rp.get({
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    "url": "https://my.jasminsoftware.com/api/233421/233421-0001/salescore/salesitems"

                })
                .then((body) => {
                    console.log("getartigos");
                    //console.log(body);

                    var artigos = JSON.parse(body);

                    //console.log (artigos.length);
                    //console.log (artigos[12].brand);

                    // console.log (artigos);

                    res.status(200).send(filtrarArtigos(artigos));
                })
                .catch((t) => {
                    console.log("errror");
                    console.log(t);
                });
        });
}

function readInventarioArtigo(req, res) {
    console.log('Ler Inventario');
    var codigo_artigo = req.params.codigo_artigo;
    jasmincontroller.get_token()
        .then((body) => {
            var r = JSON.parse(body);
            var access_token = r.access_token;
            console.log('Token Jasmin');

            rp.get({
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    "url": "https://my.jasminsoftware.com/api/233421/233421-0001/materialscore/materialsItems/" + codigo_artigo

                })
                .then((body) => {
                    var inventario = JSON.parse(body);
                    console.log("getinventario");
                    //console.log(inventario);

                    res.status(200).send(filtrarInventario(inventario));

                })
                .catch((t) => {
                    console.log("errror");
                    console.log(t);
                });


        });
}


function filtrarArtigos(artigos) {
    var r = artigos.filter(artigo => artigo.itemType == 1 && artigo.isActive == true).map(
        artigo => {
            return {
                codigo_artigo: artigo.itemKey,
                nome: artigo.description,
                descricao_completa: artigo.complementaryDescription,
                imagem: artigo.image,
                preco: artigo.priceListLines.length > 0 ? artigo.priceListLines[0].priceAmount.amount : 0,
                moeda: artigo.priceListLines.length > 0 ? artigo.priceListLines[0].priceAmount.symbol : "",
                //unidade:artigo.priceListLines[0].unit,
                marca: artigo.brand,
                modelo: artigo.brandModel
            }
        }
    );

    //console.log(r);
    return r;


}

function filtrarInventario(inventario) {
    var armazens = inventario.materialsItemWarehouses.filter(armazem => armazem.warehouse == "PORTO" || armazem.warehouse == "LISBOA").map(
        armazem => {
            return {
                armazem: armazem.warehouse,
                nome_armazem: armazem.warehouseDescription,
                quantidade: armazem.stockBalance
            }
        }
    );

    var artigo = {
        codigo_artigo: inventario.itemKey,
        nome: inventario.description,
        armazens: armazens
    };

    console.log("filtrarinventario");
    //console.log(artigo);


    return artigo;

}

function saveArtigo(req, res) {
    //console.log(req.body);
    var form = {

        "itemKey": req.body.codigo_artigo,
        "description": req.body.nome,
        "complementaryDescription": req.body.descricao_completa,
        "assortment": null,
        "barcode": "----",
        "brand": req.body.marca,
        "brandModel": req.body.modelo,
        "itemType": 1,
        "baseUnit": "UN",
        "unit": "UN",
        "itemTaxSchema": "IVA-TN",
        "isExternallyManaged": false,
        "image": req.body.imagem,
        "remarks": null,
        "externalId": null,
        "externalVersion": null
    };

    console.log("saveArtigos2");


    jasmincontroller.get_token()
        .then((body) => {
            var r = JSON.parse(body);
            var access_token = r.access_token;
            console.log("save artigos TOKEN");
            //console.log(form);
            var formData = JSON.stringify(form);
            var content_length = formData.length;
            rp.post({
                "headers": {
                    "Content-Length": content_length,
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + access_token
                },
                "url": "https://my.jasminsoftware.com/api/233421/233421-0001/businessCore/items",
                "body": formData
            }).then((body) => {
                //console.log(JSON.stringify(body));
                res.status(200).send({ resposta: "OK" });

            }).catch((t) => {
                console.log("error");
                console.log(t);
            });

        })



}

function getMarcas(req, res) {
    jasmincontroller.get_token()
        .then((body) => {
            var r = JSON.parse(body);
            var access_token = r.access_token;
            console.log('Token Jasmin');

            rp.get({
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    "url": "https://my.jasminsoftware.com/api/233421/233421-0001/businessCore/brands"

                })
                .then((body) => {
                    console.log("getMARCAS");

                    var marcas = JSON.parse(body);
                    //console.log(marcas);

                    res.status(200).send(filtro_marcas(marcas));
                })
                .catch((t) => {
                    console.log("errror");
                    console.log(t);
                });


        });
}

function filtro_marcas(marcas) {
    return marcas.map(
        marca => {
            return {
                marca: marca.naturalKey,
                descricao: marca.description == null ? marca.brandKey : marca.description
            }
        }
    );


}

function getModelos(req, res) {
    jasmincontroller.get_token()
        .then((body) => {
            var r = JSON.parse(body);
            var access_token = r.access_token;
            console.log('Token Jasmin');

            rp.get({
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    "url": "https://my.jasminsoftware.com/api/233421/233421-0001/businessCore/brandModels"

                })
                .then((body) => {
                    console.log("getMODELOS");

                    var modelos = JSON.parse(body);

                    //console.log(modelos);


                    res.status(200).send(filtro_modelos(modelos));
                })
                .catch((t) => {
                    console.log("errror");
                    console.log(t);
                });


        });
}


function filtro_modelos(modelos) {
    var modelos_filtrados = [];

    return modelos.map(
        item => {
            return {
                marca: item.brand,
                descricao_marca: item.brandDescription == null ? item.brand : item.brandDescription,
                modelo: item.modelKey,
                descricao: item.description == null ? item.modelKey : item.description
            }
        }
    );

}


function createSaleItem(req, res) {
    //console.log(req.body);
    var form = {

        "unit": "UN",
        "itemTaxSchema": "IVA-TN",
        "incomeAccount": "71111",
        "locked": false,
        "baseEntityKey": req.body.codigo_artigo,
        "priceListLines": [{
            "priceList": "PVP1",
            "priceAmount": {
                "amount": req.body.preco
            },
            "unit": "UN"
        }]

    };

    //console.log(form);


    jasmincontroller.get_token()
        .then((body) => {
            var r = JSON.parse(body);
            var access_token = r.access_token;
            console.log("save artigos TOKEN");
            //console.log(form);
            var formData = JSON.stringify(form);
            var content_length = formData.length;
            rp.post({
                "headers": {
                    "Content-Length": content_length,
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + access_token
                },
                "url": "https://my.jasminsoftware.com/api/233421/233421-0001/salescore/salesitems/extension",
                "body": formData
            }).then((body) => {
                //console.log(JSON.stringify(body));
                res.status(200).send({ resposta: "OK" });

            }).catch((t) => {
                //console.log("error");
                //console.log(t);
            });

        })
}

function createMaterialItem(req, res) {
    //console.log(req.body);
    var form = {

        "defaultWarehouse": "PORTO",
        "baseEntityKey": req.body.codigo_artigo
    };

    //  console.log(form);


    jasmincontroller.get_token()
        .then((body) => {
            var r = JSON.parse(body);
            var access_token = r.access_token;
            console.log("save artigos TOKEN");
            //console.log(form);
            var formData = JSON.stringify(form);
            var content_length = formData.length;
            rp.post({
                "headers": {
                    "Content-Length": content_length,
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + access_token
                },
                "url": "https://my.jasminsoftware.com/api/233421/233421-0001/materialscore/materialsitems/extension",
                "body": formData
            }).then((body) => {
                //   console.log(JSON.stringify(body));
                res.status(200).send({ resposta: "OK" });

            }).catch((t) => {
                console.log("error");
                console.log(t);
            });

        })
}

function StockInicialPorto(req, res) {
    //console.log(req.body);
    var form = {

        "warehouse": "PORTO",
        "adjustmentReason": "12",
        "company": "VC",
        "documentLines": [{
            "materialsItem": req.body.codigo_artigo,
            "quantity": req.body.stock_porto,
            "unitPrice": { "amount": req.body.preco }
        }]
    };

    //console.log(form);


    jasmincontroller.get_token()
        .then((body) => {
            var r = JSON.parse(body);
            var access_token = r.access_token;
            console.log("save artigos TOKEN");
            //console.log(form);
            var formData = JSON.stringify(form);
            var content_length = formData.length;
            rp.post({
                "headers": {
                    "Content-Length": content_length,
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + access_token
                },
                "url": "https://my.jasminsoftware.com/api/233421/233421-0001/materialsmanagement/itemAdjustments",
                "body": formData
            }).then((body) => {
                // console.log(JSON.stringify(body));
                res.status(200).send({ resposta: "OK" });

            }).catch((t) => {
                console.log("error");
                console.log(t);
            });

        })

}

function StockInicialLisboa(req, res) {
    //console.log(req.body);
    var form = {

        "warehouse": "LISBOA",
        "adjustmentReason": "12",
        "company": "VC",
        "documentLines": [{
            "materialsItem": req.body.codigo_artigo,
            "quantity": req.body.stock_lisboa,
            "unitPrice": { "amount": req.body.preco }
        }]
    };

    //  console.log(form);


    jasmincontroller.get_token()
        .then((body) => {
            var r = JSON.parse(body);
            var access_token = r.access_token;
            console.log("save artigos TOKEN");
            //console.log(form);
            var formData = JSON.stringify(form);
            var content_length = formData.length;
            rp.post({
                "headers": {
                    "Content-Length": content_length,
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + access_token
                },
                "url": "https://my.jasminsoftware.com/api/233421/233421-0001/materialsmanagement/itemAdjustments",
                "body": formData
            }).then((body) => {
                //  console.log(JSON.stringify(body));
                res.status(200).send({ resposta: "OK" });

            }).catch((t) => {
                console.log("error");
                console.log(t);
            });

        })

}

function uploadImagem(req, res) {
    console.log('upload imagem');
    // console.log(req);
    upload(req, res, (err) => {
        if (err) {
            console.log('ERRO UPLOAD');
            console.log(err);
        } else {
            console.log('upload erro');
            //console.log(req.file);
            res.status(200).send({ resposta: "OK", path: req.file.path });
        }
    });
}

function desativarArtigo(req, res) {

    var codigo_artigo = req.params.codigo_artigo;

    var form = {
        "itemKey": codigo_artigo,
        "value": false

    };

    jasmincontroller.get_token()
        .then((body) => {
            var r = JSON.parse(body);
            var access_token = r.access_token;
            var formData = JSON.stringify(form);

            console.log('formData');
            //console.log (formData);

            rp.put({
                    "headers": {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": "Bearer " + access_token
                    },
                    "url": "https://my.jasminsoftware.com/api/233421/233421-0001/salesCore/salesItems/" + codigo_artigo + "/isActive",
                    "body": formData
                })
                .then((body) => {
                    //console.log(JSON.stringify(form));          
                    res.status(200).send({ resposta: "OK" });

                })
                .catch((t) => {
                    console.log("errror");
                    console.log(t);
                });


        });
}


module.exports = {
    read: read,
    readInventarioArtigo: readInventarioArtigo,
    saveArtigo: saveArtigo,
    getMarcas: getMarcas,
    getModelos: getModelos,
    createSaleItem: createSaleItem,
    createMaterialItem: createMaterialItem,
    StockInicialPorto: StockInicialPorto,
    StockInicialLisboa: StockInicialLisboa,
    uploadImagem: uploadImagem,
    desativarArtigo: desativarArtigo
};