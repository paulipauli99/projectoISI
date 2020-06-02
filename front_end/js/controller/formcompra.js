window.onload = function() { //quando inicia a página - > chama a funçao
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