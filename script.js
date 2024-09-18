function abrirPopupIncricao(){
    let popup = document.querySelector("#modal")
    popup.style.display="flex"
}

function abrirPopupDoeAqui(){
    let popup = document.querySelector("#modal")
    popup.style.display="flex"
}

// Fechar o modal clicando fora do #inscricao
document.getElementById('modal').addEventListener('click', function(e) {
    const inscricao = document.getElementById('inscricao');
    if (!inscricao.contains(e.target)) {
        fecharModal(); // Função para fechar o modal
    }
});

// Função para fechar o modal
function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}


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

document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.querySelector('.search_bar');
    const searchButton = document.querySelector('#searchButton');

    searchButton.addEventListener('click', function() {
        searchBar.classList.toggle('expanded');
        const input = searchBar.querySelector('input');
        if (searchBar.classList.contains('expanded')) {
            input.focus(); // Foca no campo de pesquisa quando expandido
        }
    });

    // Fechar a barra de pesquisa quando clicar fora dela
    document.addEventListener('click', function(event) {
        if (!searchBar.contains(event.target) && searchBar.classList.contains('expanded')) {
            searchBar.classList.remove('expanded');
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('inputSearch');
    
    function highlightText(searchTerm) {
      removeHighlights(); // Remove os destaques antigos
      
      if (searchTerm) {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        
        // Função para percorrer e destacar o texto dos elementos
        function traverseNodes(node) {
          if (node.nodeType === 3) { // Node.TEXT_NODE
            const parent = node.parentNode;
            const matches = node.nodeValue.match(regex);
            if (matches) {
              const newHTML = node.nodeValue.replace(regex, `<span class="highlight">$1</span>`);
              parent.innerHTML = newHTML;
            }
          } else if (node.nodeType === 1 && node.childNodes.length) { // Node.ELEMENT_NODE
            node.childNodes.forEach(traverseNodes);
          }
        }

        traverseNodes(document.body);
      }
    }

    function removeHighlights() {
      document.querySelectorAll('.highlight').forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
      });
    }
    
    searchButton.addEventListener('click', function() {
      const searchTerm = searchInput.value.trim();
      highlightText(searchTerm);
    });
    
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        highlightText(searchTerm);
      }
    });
  });