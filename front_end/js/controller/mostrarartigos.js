lista_artigosFRONT = [];



window.onload = function() { //quando inicia a página - > chama a funçao
        listaArtigosFRONT();

    }
    /*function procura_artigo(codigo_artigo) {
        for (const artigo of lista_artigos) {
            if (artigo.codigo_artigo == codigo_artigo)
                return artigo;
        }
        return null;
    }*/


function listaArtigosFRONT() {

    fetch('http://localhost:8080/artigos')
        .then(response => { return response.json(); })
        .then(artigos => {
            lista_artigosFRONT = artigos;
            mostrarArtigos(artigos)
        });

}


function mostrarArtigos(artigos) {

    const renderArtigosFRONT = document.getElementById("artigos_FRONT");


    console.log("arqtigos");
    let imagem = "";
    let txt = "";
    // txt += "<section class='ftco-section bg-light'>";
    //txt += "<div class='container'>";
    txt += "<div class='row'>";

    for (const artigo of artigos) {

        if (artigo.imagem == null) {
            imagem = "upload/auto_car-16.jpg";
        } else {
            imagem = artigo.imagem.replace("../front_end\\", "");
        }


        //imagem = "xx";
        console.log();

        txt += "<div class='col-md-4'>";
        txt += "<div class='card'>";
        txt += "<div class='card-box'>";
        txt += "<div class='card-image'>";
        txt += "<img src='" + imagem + "' onError='img_error(this)' class='card-img-top img-fluid' >";
        txt += "</div>";
        txt += "<div class='card-content'>";
        txt += "<div class='title'>";
        txt += "<h2 class='mb-0'><a href='car-single.html'>" + (artigo.nome == null ? "" : artigo.nome) + "</a></h2>";
        txt += "<div class='d-flex mb-3'>";
        txt += "<span class='cat'>" + artigo.marca + "</span>";
        txt += "<p class='price ml-auto'>" + artigo.preco + "<span>" + artigo.moeda + "</span></p> ";

        txt += "</div>";
        txt += "<div class='text'>";
        txt += "<p class='price ml-auto'>" + artigo.descricao_completa + "</p>";
        txt += "</div>";

        txt += "</div>";
        txt += "<div class='card-action'>";
        txt += "<p class='d-flex mb-0 d-block'>";
        txt += " <a><button type='button' align='center' class='btn btn-info btn-lg' data-toggle='modal' data-target='#myModal'>Comprar</button></a>";
        //   txt += "<a href='car-single.html' class='btn btn-secondary py-2 ml-1'>Detalhes</a>
        txt += "</p>";
        txt += "</div>";
        txt += "</div>";
        txt += "</div>";
        txt += "</div>";
        txt += "</div>";
    }

    txt += "</div>";
    //txt += "</div>";
    //txt += "</section>"; 
    renderArtigosFRONT.innerHTML = txt;



    //style="background-image: url(images/car-2.jpg);">
}

function img_error(image) {
    image.onError = "";
    image.src = "upload/auto_car-16.jpg";
    return true;
}