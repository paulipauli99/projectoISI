window.onload = function() { //quando inicia a página - > chama a funçao
    listaArtigos();
}

function listaArtigos() {

    fetch('http://localhost:8080/artigos')
        .then(response => { return response.json(); })
        .then(artigos => tabela_artigos(artigos));


}

function tabela_artigos(artigos) {
    const renderArtigos = document.getElementById("lista_artigos"); //atribuir à variavel renderUsers os elementos do form id="result"()

    let txt = ""; //declaraçao da variavel txt

    //percorrer a variável users e por cada user cria a linha da tabela com os dados presentes

    txt = '<table class="table table-hover table-striped">';
    txt += '<thead>';
    txt += '<tr>';
    txt += '<th>Código Artigo</th>';
    txt += '<th>Nome</th>';
    txt += '<th>Designação</th>';
    txt += '<th>Marca</th>';
    txt += '<th>Modelo</th>';
    txt += '<th align="right">Preço</th>';
    txt += '<th>Unidade</th>';
    txt += '</tr>';
    txt += '</thead>';
    txt += '<tbody>';

    for (const artigo of artigos) { //cada user da variavel users
        txt += "<tr><td>" + artigo.codigo_artigo + "</td>";
        txt += "<td>" + artigo.nome + "</td>";
        txt += "<td>" + artigo.descricao_completa + "</td>"; /*split()[] - tirar a hora da data*/
        txt += "<td>" + artigo.marca + "</td>"; //cod_turno
        txt += "<td>" + artigo.modelo + "</td>";
        txt += "<td  align='right'>" + artigo.preco + " " + artigo.moeda + "</td>";
        txt += "<td>" + artigo.unidade + "</td>";
        txt += "</tr>";
    }
    txt += "</tbody></table>";


    renderArtigos.innerHTML = txt; //envia a tabela construida para a view e mostra no object com ID result
}