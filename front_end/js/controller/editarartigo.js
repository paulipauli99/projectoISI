var codigo_artigo = "";
var lineID = "";
var ajuste_porto = "";
var ajuste_lisboa = "";

var diferenca_lisboa = 0;
var diferenca_porto = 0;

/*window.onload = function () { 
   // const queryString = window.location.search;
    //this.console.log(queryString);
    //const params = new URLSearchParams(queryString);
    
     codigo_artigo = params.get("artigo");
     lineID = params.get("lineID");
    console.log(codigo_artigo);
    console.log(lineID);
    
    preenche_artigo();
    preencherStocks();
    editarArtigos();
    editarArtigo();
    
   
}*/

function editarArtigo(vcodigo_artigo, vlineID) {

    codigo_artigo = vcodigo_artigo;
    lineID = vlineID;
    preenche_artigo();
    preencherStocks();
    editarArtigos();

    //	location.href=" dashboard.html?artigo=" + codigo_artigo + "&lineID=" + lineID;
    $("#editar_artigo").modal();
}

function preenche_artigo() {
    let response = fetch('http://localhost:8080/artigo/' + codigo_artigo, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response =>

        response.json()
    ).then(
        response => {
            console.log(response);

            document.getElementById("descricao_completa_editar").value = response[0].descricao_completa;
            document.getElementById("preco_editar").value = response[0].preco;
            document.getElementById("nome_editar").value = response[0].nome;

        }
    )
}

function preencherStocks() {
    /*{
           "codigo_artigo": "S2",
           "nome": "carro 123",
           "armazens": [
               {
                   "armazem": "LISBOA",
                   "nome_armazem": "Lisboa",
                   "quantidade": 1
               },
               {
                   "armazem": "PORTO",
                   "nome_armazem": "PORTO",
                   "quantidade": 3
               }
           ]
       }*/

    let response = fetch('http://localhost:8080/inventario/' + codigo_artigo, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response =>

        response.json()
    ).then(
        response => {
            console.log(response);


            document.getElementById("stock_lisboa_editar").value = response.armazens[0].quantidade;
            document.getElementById("stock_porto_editar").value = response.armazens[1].quantidade;

            document.getElementById("stock_lisboa_atual_editar").value = response.armazens[0].quantidade;
            document.getElementById("stock_porto_atual_editar").value = response.armazens[1].quantidade;
        }
    )
}




function editarArtigos() {
    var data = {
        codigo_artigo: codigo_artigo,
        descricao_completa: document.getElementById("descricao_completa_editar").value,
        preco: document.getElementById("preco_editar").value,
        nome: document.getElementById("nome_editar").value,

        stock_porto: document.getElementById("stock_porto_editar").value,
        stock_lisboa: document.getElementById("stock_lisboa_editar").value,

        stock_porto_atual: document.getElementById("stock_porto_atual_editar").value,
        stock_lisboa_atual: document.getElementById("stock_lisboa_atual_editar").value,

        ajuste_porto: ajuste_porto,
        ajuste_lisboa: ajuste_lisboa,

        diferenca_lisboa: diferenca_lisboa,
        diferenca_porto: diferenca_porto

    };

    tipoAjustePorto(data);
    tipoAjusteLisboa(data);


    console.log(data);

    let response = fetch('http://localhost:8080/alterarnome/' + codigo_artigo, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(x => {

        console.log("Editou nome");
        editarDescricao(data);

        console.log(data);
        console.log(x);
    });
}

function editarDescricao(data) {

    console.log("nova descricao");


    let response = fetch('http://localhost:8080/alterardescricao/' + codigo_artigo, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(x => {
        console.log("Editou descricao");
        editarPreco(data);
    });

}

function editarPreco(data) {

    console.log("nova preco");
    console.log("lineID : " + lineID);


    let response = fetch('http://localhost:8080/alterarpreco/' + codigo_artigo + '/' + lineID, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(x => {
        console.log("Editou PRECO");
        if (data.ajuste_porto != "") editarStockPorto(data);
        if (data.ajuste_lisboa != "") editarStockLisboa(data);

        console.log(x);
    });

}

function editarStockPorto(data) {



    console.log("Editar Stock Porto");

    let response = fetch('http://localhost:8080/editarstockporto', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(x => {

        console.log("Stock Porto ALTERADO");

        //editarStockLisboa(data);

        //console.log(x);
    });

}

function editarStockLisboa(data) {
    console.log("Editar Stock Lisboa");

    let response = fetch('http://localhost:8080/editarstocklisboa', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(x => {

        tipoAjusteLisboa(data);
        console.log("Stock LISBOA Alterado");

        // console.log(x);
    });

}

function tipoAjustePorto(data) {

    data.diferenca_porto = data.stock_porto - data.stock_porto_atual;
    console.log("diferenca_porto =" + data.diferenca_porto);

    if (data.diferenca_porto > 0) {
        data.ajuste_porto = "10"; //AUMENTO DE STOCK

    } else if (data.diferenca_porto < 0) {
        data.diferenca_porto = -1 * data.diferenca_porto;
        data.ajuste_porto = "01"; //ABATE DE STOCK

    }


}


function tipoAjusteLisboa(data) {

    data.diferenca_lisboa = data.stock_lisboa - data.stock_lisboa_atual;
    console.log("diferenca_lisboa =" + data.diferenca_lisboa);

    if (data.diferenca_lisboa > 0) {
        data.ajuste_lisboa = "10"; //AUMENTO DE STOCK

    } else if (data.diferenca_lisboa < 0) {
        data.diferenca_lisboa = -1 * data.diferenca_lisboa;
        data.ajuste_lisboa = "01"; //ABATE DE STOCK

    }


}