var lista_artigos = [];
var inventario = [];

/*
window.onload = function() { //quando inicia a página - > chama a funçao
    listaArtigos();
    
}
*/

function listaArtigos() {

    fetch('http://localhost:8080/artigos')
        .then(response => { return response.json(); })
        .then(artigos => {
            lista_artigos = artigos;
            tabela_artigos(artigos)
        });

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
    txt += '<th></th>';
    txt += '<th></th>';
    txt += '<th></th>';
    txt += '</tr>';
    txt += '</thead>';
    txt += '<tbody>';

    for (const artigo of artigos) { //cada user da variavel users
        txt += "<tr><td align='center'>" + artigo.codigo_artigo + "</td>";
        txt += "<td>" + artigo.nome + "</td>";
        txt += "<td>" + artigo.descricao_completa + "</td>"; /*split()[] - tirar a hora da data*/
        txt += "<td>" + artigo.marca + "</td>"; //cod_turno
        txt += "<td>" + artigo.modelo + "</td>";
        txt += "<td  align='center' nowrap>" + artigo.preco + " " + artigo.moeda + "</td>";
        txt += "<td> <button type='button' class='btn btn-info btn-lg' onClick='abre_artigo(\"" + artigo.codigo_artigo + "\")'> detalhes </button></td>";
        txt += "<td> <button type='button' class='btn btn-info btn-lg' onClick='eliminarArtigo(\"" + artigo.codigo_artigo + "\")'> apagar </button></td>";
        txt += "<td> <button type='button' class='btn btn-info btn-lg' onClick='editarArtigo(\"" + artigo.codigo_artigo + "\",\"" + artigo.lineID + "\")'> Editar </button></td>";
        txt += "</tr>";
    }
    txt += "</tbody></table>";


    renderArtigos.innerHTML = txt; //envia a tabela construida para a view e mostra no object com ID result
}


function procura_artigo(codigo_artigo) {
    for (const artigo of lista_artigos) {
        if (artigo.codigo_artigo == codigo_artigo)
            return artigo;
    }
    return null;
}

function abre_artigo(codigo_artigo) {

    fetch('http://localhost:8080/inventario/' + codigo_artigo)
        .then(response => { return response.json(); })
        .then(artigo => {

            const renderArtigoInventario = document.getElementById("artigo_inventario");

            let txt = "";
            txt += "<p>Codigo: " + artigo.codigo_artigo + "</p>";
            txt += "<p>Nome: " + artigo.nome + "</p>";


            //	txt += "<p>Armazem: " + artigo.armazens + "</p>";
            //	txt += "<p>Quantidade: " + inventario.quantidade + "</p>";

            console.log("abre_artigo:" + codigo_artigo);

            const artigo_inventario = procura_artigo(codigo_artigo);

            /*    txt += "<p>Preço: " + artigo_inventario.preco + artigo_inventario.moeda + "</p>";
            txt += '<table  class="table table-hover table-striped">';
            txt += '<thead>';
            txt += '<tr>';
            txt += '<th >Armazém</th>';
            txt += '<th align="center" >Quantidade</th>';
            txt += '</tr>';
            txt += '</thead>';
            txt += '<tbody>';

            for (const armazem of artigo.armazens) {
                txt += "<tr><td>" + armazem.nome_armazem + "</td>";
                txt += "<td align='center'>" + armazem.quantidade + "</td></tr>";

            }
            txt += '</tbody>';
            txt += '</table>';
*/
            for (const armazem of artigo.armazens) {
                txt += "<p>" + armazem.nome_armazem + "</p>";
                txt += "<p>" + armazem.quantidade + "</p>";

            }


            //console.log (artigo_inventario);

            console.log("Nome: " + artigo.nome);
            //	console.log("Preço: " + artigo.armazens);
            //	console.log("Armazem: " + inventario.armazem);	

            renderArtigoInventario.innerHTML = txt;

            $("#modalDetalhes").modal();
        });
}

function eliminarArtigo(codigo_artigo) {

    fetch('http://localhost:8080/desativarArtigo/' + codigo_artigo)
        .then(response => {
            return response.json();
        }).then(artigo => {
            procura_artigo(codigo_artigo);
            console.log("artigoeliminado");
            listaArtigos();
        })


}