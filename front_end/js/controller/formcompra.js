var codigo_artigo = "";
var armazem = "";
var x = "";
var artigo = null;


window.onload = function() { //quando inicia a página - > chama a funçao
    const queryString = window.location.search;
   this.console.log(queryString);
   const params = new URLSearchParams(queryString);
   
    codigo_artigo = params.get("artigo");
    
   console.log(codigo_artigo);
   
    
    console.log("formulario compra");
    
    preencheArtigo();
   
    listarCliente();
}

function listarCliente() {

    fetch('http://localhost:8080/consultarCliente')
        .then(response => { return response.json(); })
        .then(cliente => lista_clientes(cliente));
}

function lista_clientes(cliente) {
    document.getElementById("nome").innerHTML += cliente.nome;
    document.getElementById("tele").innerHTML += cliente.telemovel;
    document.getElementById("rua").innerHTML += cliente.rua;
    document.getElementById("local").innerHTML += cliente.localidade;
    document.getElementById("concelho").innerHTML += cliente.concelho;
    document.getElementById("distrito").innerHTML += cliente.distrito;
    document.getElementById("cp").innerHTML += cliente.codigo_postal;
    document.getElementById("price").value = 1990;

}



function preencheArtigo(){
    let response = fetch('http://localhost:8080/artigo/' + codigo_artigo, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }                 
}).then(response => {
    console.log("preenche artigo1:" + codigo_artigo);
    console.log(response);

    return response.json();
}
    
).then(
    response => { 

        console.log("preenche artigo:" + codigo_artigo);
        console.log(response);

        artigo = {
            codigo : response[0].codigo_artigo,
            marca : response[0].marca,
            preco : response[0].preco,
            modelo : response[0].modelo,
            moeda : response[0].moeda
        }
        dados_artigo(artigo);
    }) 

}

function dados_artigo(artigo){

document.getElementById("marca").innerHTML += artigo.marca;
    document.getElementById("modelo").innerHTML += artigo.modelo;
    document.getElementById("preco").innerHTML += artigo.preco;
    document.getElementById("moeda").innerHTML += artigo.moeda;
}


/*function pagar(){
    stockCompra();
}*/

function stockCompra(){

    var data = {
        codigo_artigo:codigo_artigo,
        armazem:armazem,    
        diferenca:document.getElementById("quantidade").value,
        preco:artigo.preco
        
    };
    
    
    selecionarArmazem(data);
    console.log(data);
    
    
    
        let response = fetch('http://localhost:8080/compraartigos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(x => {
            console.log("alterou stock no artigo: " + codigo_artigo);
          
        });
    
    }
    
    
    function selecionarArmazem(data){
     data.armazem =  document.getElementById("armazem").value;
      
    
    }
    




