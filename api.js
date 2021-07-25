// Endpoint
// https://restcountries.eu/rest/v2/

const url = 'https://restcountries.eu/rest/v2/all';


fetch(url)
    .then( (resposta) => resposta.json() )
    .then( (dados) => { 
        console.log(dados);
               
        let html = "";
 
        for (let i = 0; i < dados.length; i++){

        	html += `
        	    <option value="paises">${dados[i].name}</option>`;

            document.getElementById("btnEnviar").onclick = function() {


              var selecionado = document.getElementById("allcountry");
              var numeroDoPais = selecionado.selectedIndex;

              var a1 = dados[numeroDoPais].name;
              var a = dados[numeroDoPais].capital;
              var b = dados[numeroDoPais].population;             
              let c = `
                  <img src="${dados[numeroDoPais].flag}" />
              `;
              var d = dados[numeroDoPais].region;
              var e = dados[numeroDoPais].area;
 
              for(let f = 0; f < dados[numeroDoPais].currencies.length; f++){
                  
                  var ff = dados[numeroDoPais].currencies[f].name;
                  var fff = dados[numeroDoPais].currencies[f].symbol;


                  document.querySelector("#moeda").innerHTML = ff;
                  document.querySelector("#simbolo").innerHTML = fff;

              }

              for(let g = 0; g < dados[numeroDoPais].languages.length; g++){
                  
                  var gg = dados[numeroDoPais].languages[g].name;


                  document.querySelector("#idioma").innerHTML = gg;
                

              }
               document.querySelector("#nome").innerHTML = a1;
               document.querySelector("#capital").innerHTML = a;
               document.querySelector("#populacao").innerHTML = b;
               document.querySelector("#bandeira").innerHTML = c;
               document.querySelector("#continente").innerHTML = d;
               document.querySelector("#area").innerHTML = e;
               
           };
         
        }
        document.querySelector("#allcountry").innerHTML = html;
       

       
       

     

    })
    .catch( (erro) => console.log(erro) );


