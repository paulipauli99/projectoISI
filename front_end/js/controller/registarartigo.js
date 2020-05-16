var marcas=[];
var modelos=[];

/*
window.onload = function () { 
    carrega_marcas_modelos();
    gravarArtigos();
  //  gravarImagem();
	
}
*/
function carrega_marcas_modelos() {

    let response = fetch('http://localhost:8080/modelos', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }                 
}).then(response => response.json())
.then(resposta => {
    modelos = resposta;
    for (const modelo of modelos) {
        
        var t = marcas.find(item => item.marca==modelo.marca);

        console.log(t);

        if (!t) {
            marcas.push({
                marca: modelo.marca, 
                descricao_marca : modelo.descricao_marca, 
                modelos: [
                    {
                        modelo: modelo.modelo, 
                        descricao_modelo: modelo.descricao
                    }
                ]
            })
        } else {
            t.modelos.push({
                modelo: modelo.modelo, 
                descricao_modelo: modelo.descricao
            });
        }

    
    } 

    console.log ("marcas");
    console.log (marcas);

    preenche_marcas();
    preenche_modelos(marcas[0].marca);

});
    
}

function preenche_marcas() {
    
	const renderMarcas = document.getElementById("marca");
	
	let txt = ""; 
							   
		for (const marca of marcas) { 
			txt += "<option value='" + marca.marca + "'>" + marca.descricao_marca + "</td>";
        }
        
	renderMarcas.innerHTML = txt; 
}

function escolhe_marca() {

    const marca = document.getElementById("marca").value;
	
    console.log ("escolhe marca:" + marca);

    preenche_modelos(marca);

}

function preenche_modelos(nome_marca) {


    const renderModelos = document.getElementById("modelo");
    

    const modelos = marcas.find(marca => marca.marca==nome_marca).modelos;


	let txt = ""; 
							   
		for (const modelo of modelos) { 
			txt += "<option value='" + modelo.modelo + "'>" + modelo.descricao_modelo + "</td>";
        }
        
	renderModelos.innerHTML = txt; 

}


function gravarArtigos() {

    var foto = document.getElementById("foto");

    console.log ("gravar artigos");
    console.log(foto.files.length);

    if (foto.files.length==0) {
        //Não tem foto - grava artigo direKto
        gravarArtigoBase();
    } else {
        gravarImagem();
    }

}

function gravarArtigoBase(){
   // alert('gravarartigos');
    var data = {
       
        codigo_artigo : document.getElementById("codigo_artigo").value,
		descricao_completa : document.getElementById("descricao_completa").value,
        marca : document.getElementById("marca").value,
        modelo : document.getElementById("modelo").value,
        imagem : document.getElementById("path_imagem").value,
        preco : document.getElementById("preco").value,
        nome : document.getElementById("nome").value, 
        stock_porto: document.getElementById("stock_porto").value,
        stock_lisboa:document.getElementById("stock_lisboa").value
    };  



            let response = fetch('http://localhost:8080/registartigo', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)                
    }).then(x => {
        gravarSaleItem (data);
        
     //  gravarImagem(data)
        
        console.log(data);
        console.log(x);
        }
        );
}



function gravarSaleItem(data){

    console.log ("gravarSaleItem");


         let response = fetch('http://localhost:8080/saleitem', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)                 
  }).then(x => {
      console.log("gravou sale Item");
      gravarMaterialItem(data);
    });

}

function gravarMaterialItem(data){
    
    console.log ("gravarMaterialItem");

         let response = fetch('http://localhost:8080/materialitem', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)                  
  }).then(x =>  {
      console.log ("gravou MaterialItem");
      gravarStockPorto(data);
    });

}

function gravarStockPorto(data){
    
    console.log ("gravarStockPorto");

    let response = fetch('http://localhost:8080/stinicialporto', {
       method: 'POST',
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)                 
}).then(x => {
    console.log("gravoustockPORTO");
    gravarStockLisboa(data);
})
}


function gravarStockLisboa(data){
    
    console.log ("vai gravarStockLisboa");

    let response = fetch('http://localhost:8080/stiniciallisboa', {
       method: 'POST',
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)                 
}).then(x => {
    console.log("gravoustockLISBOA");
   

})

}



 function gravarImagem1(url, data) {
        const foto = document.getElementById("foto");
       


    const upload = (file) => {
        fetch('http://localhost:8080/upload', {
          method: 'POST',
          body: file
        }).then(x => {
            console.log("ENVIOU");
            console.log(x);
        }).catch(x => {
            console.log("ERRO");
            console.log(x);
   
        });
        
    };

    upload(foto.files[0]);
} 
    


  function gravarImagem(url, data) {
        //const foto = document.getElementById("foto");

        console.log ("gravarImagem");

        var form = document.getElementById("registo_artigo");

        const formData  = new FormData(form);
      
        console.log (formData);
        
          //formData.append("myImage", foto.files[0]);
        
      
     fetch('http://localhost:8080/upload', {
          method: 'POST',
          headers: {
          },
          body: formData
        }).then(response => {
            console.log("ENVIOU");
            console.log(response);
            return response.json();
        }).then(x => {
            console.log("ENVIOU2");
            console.log(x);
            var pi = document.getElementById("path_imagem");
            var nome = x.path;
            nome = nome.replace('../','http://localhost:8080/');
            nome = nome.replace('\\','/');
            
            pi.value = nome;

            gravarArtigoBase();


        }).catch(x => {
            console.log("ERRO");
            console.log(x);
   
        })
        
    }      
 
 
