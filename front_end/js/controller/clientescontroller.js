window.onload = function() { //quando inicia a página - > chama a funçao
    listaClientes();
}

function listaClientes() {

    fetch('http://localhost:8080/clientes')
        .then(response => { return response.json(); })
        .then(clientes => tabela_clientes(clientes));
}

function tabela_clientes(clientes) {
    const renderClientes = document.getElementById("lista_clientes"); //atribuir à variavel renderUsers os elementos do form id="result"()

    let txt = ""; //declaraçao da variavel txt

    //percorrer a variável users e por cada user cria a linha da tabela com os dados presentes

    txt = '<table class="table table-hover table-striped">';
    txt += '<thead>';
    txt += '<tr>';
    txt += '<th>ID</th>';
    txt += '<th>Nome completo</th>';
    txt += '<th>Telemóvel</th>';
    txt += '<th>Email</th>';
    txt += '<th>Rua</th>';
    txt += '<th>Localidade</th>';
    txt += '<th>Concelho</th>';
    txt += '<th>Distrito</th>';
    txt += '<th>Código postal</th>';
    txt += '<th></th>';
    txt += '<th></th>';
    txt += '</tr>';
    txt += '</thead>';
    txt += '<tbody>';
    for (const cliente of clientes) { //cada user da variavel users
        if (cliente.admin === "n") {
            var idCliente = cliente.hs_object_id;

            txt += "<tr><td>" + cliente.hs_object_id + "</td>";
            txt += "<td>" + cliente.nome + "</td>";
            txt += "<td>" + cliente.telemovel + "</td>";
            txt += "<td>" + cliente.email + "</td>";
            txt += "<td>" + cliente.rua + "</td>";
            txt += "<td>" + cliente.localidade + "</td>";
            txt += "<td>" + cliente.concelho + "</td>";
            txt += "<td>" + cliente.distrito + "</td>";
            txt += "<td>" + cliente.codigo_postal + "</td>";

            txt += "<td> <form action='/editarAdmin' method='post'> <input type='hidden' id='editarID' name='editarID' value=" + idCliente + "></input> <button class='btn btn-outline-dark'>Editar</button> </form> </td>";
            txt += "<td> <form action='/apagarCliente' method='post'> <input type='hidden' id='apagarID' name='apagarID' value=" + idCliente + "></input> <button class='btn btn-outline-danger'>Apagar</button> </form> </td>";
            txt += "</tr>";
        }
    }
    txt += "</tbody></table>";


    renderClientes.innerHTML = txt; //envia a tabela construida para a view e mostra no object com ID result
}