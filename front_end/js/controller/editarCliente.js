window.onload = function() { //quando inicia a página - > chama a funçao
    listarCliente();
}

function listarCliente() {

    fetch('http://localhost:8080/consultarCliente')
        .then(response => { return response.json(); })
        .then(cliente => lista_clientes(cliente));
}

function lista_clientes(cliente) {
    document.getElementById("nome").value = cliente.nome;
    document.getElementById("email").value = cliente.email;
    document.getElementById("tele").value = cliente.telemovel;
    document.getElementById("rua").value = cliente.rua;
    document.getElementById("local").value = cliente.localidade;
    document.getElementById("concelho").value = cliente.concelho;
    document.getElementById("distrito").value = cliente.distrito;
    document.getElementById("cp").value = cliente.codigo_postal;
    document.getElementById("pass").value = cliente.password;

}