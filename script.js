function abrirPopupIncricao(){
    let popup = document.querySelector("#modal")
    popup.style.display="flex"
}

function abrirPopupDoeAqui(){
    let popup = document.querySelector("#modal")
    popup.style.display="flex"
}

let fundoModal = document.querySelector("#closeModal")
fundoModal.addEventListener("click",()=> {
    let popup = document.querySelector("#modal")
    popup.style.display="none"
})




document.getElementById("botaoInscricao").addEventListener("click",enviaCadastro)

function ValidaFormulario(){
  if(document.getElementById("nomeResponsavel").value != "" && document.getElementById("telefone").value != ""){
    return true;
  }
  else{
    return false;
  }
}


function enviaCadastro() {
    console.log('entrou no envio do cadastro.');
    if(!ValidaFormulario()){
        alert("Falta preencher nome ou telefone.");
    }

    if(document.getElementById("tipoInscricao").value == "voluntario")
    {
        var objeto = {
            nome: document.getElementById("nomeResponsavel").value,
            telefone: document.getElementById("telefone").value,
            projeto: document.getElementById("projeto").value
        }
        console.log('isncrição = voluntario');
        console.log(objeto);

        const fs = require('fs');

        fs.writeFile('voluntarios.txt', objeto, (err) => {
            if (err) {
                console.log("erro");
                throw err;
            }
        });
    }

    alert("Prontinho!");
}
