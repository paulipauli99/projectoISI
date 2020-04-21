formulario.onsubmit = function() { //quando inicia a página - > chama a funçao
    listaClientes();
}

function listaClientes() {

    fetch('http://localhost:8080/signup')
        .then(response => { return response.json(); })
        .then(clientes => tabela_clientes(clientes));
}

function tabela_clientes(clientes) {
    const nomeBox = document.getElementById("nome"); //atribuir à variavel renderUsers os elementos do form id="result"()
    const teleBox = document.getElementById("tele");
    const emailBox = document.getElementById("email");
    const ruaBox = document.getElementById("rua");
    const localBox = document.getElementById("local");
    const concelhoBox = document.getElementById("concelho");
    const distritoBox = document.getElementById("distrito");
    const cpBox = document.getElementById("cp");
    const passBox = document.getElementById("pass");


}