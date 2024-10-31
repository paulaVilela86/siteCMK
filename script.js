const supabaseUrl = 'https://hgkpreqzpcvuukrbuiys.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhna3ByZXF6cGN2dXVrcmJ1aXlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE5MDg0MTIsImV4cCI6MjAzNzQ4NDQxMn0.8dWfWxBU2tRq0L_yXtDaZCdC5qbl-AOefGFNZUxgAHU'
const dbClient = supabase.createClient(supabaseUrl, supabaseKey)


document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('botaoEnviar').addEventListener('click', function() {
    const phoneNumber = '5521999009993'; // Substitua pelo número de telefone no formato internacional
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const message = `Olá, meu nome é ${nome}. Meu telefone é ${telefone}. Estou interessado em saber mais!`;
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
});

  // Fechar o modal clicando fora do #inscricao
  document.getElementById('modal').addEventListener('click', function(e) {
    const inscricao = document.getElementById('inscricao');
    if (!inscricao.contains(e.target)) {
        fecharModal(); // Função para fechar o modal
    }
  });

  document.getElementById('modalDoeAqui').addEventListener('click', function(e) {
    const inscricao = document.getElementById('inscricao');
    if (!inscricao.contains(e.target)) {
        fecharModal(); // Função para fechar o modal
    }
  });

  document.getElementById("botaoInscricao").addEventListener("click",enviaCadastro)

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

  
function abrirPopupIncricao(){
  let popup = document.querySelector("#modal")
  popup.style.display="flex"
}

function abrirPopupDoeAqui(){
  let popup = document.querySelector("#modalDoeAqui")
  popup.style.display="flex"
}

// Função para fechar o modal
function fecharModal() {
  document.getElementById('modal').style.display = 'none';
  document.getElementById('modalDoeAqui').style.display = 'none';
}


function ValidaFormulario(){
  if(document.getElementById("nomeResponsavel").value != "" && document.getElementById("telefoneResponsavel").value != ""){
    return true;
  }
  else{
    return false;
  }
}


async function enviaCadastro() {
  console.log('entrou no envio do cadastro.');
  if(!ValidaFormulario()){
      alert("Falta preencher nome ou telefone.");
  }

  var objeto = {
    tipoInscricao:document.getElementById("tipoInscricao").value,
    nomeResponsavel: document.getElementById("nomeResponsavel").value,
    nomeCrianca:document.getElementById("nomeAluno").value,
    telefone: document.getElementById("telefoneResponsavel").value,
    projeto: document.getElementById("projeto").value
  }

  console.log(objeto)

  const { error } = await dbClient
  .from('inscricoes')
  .insert(objeto)

  if(error != undefined){
      console.log(error);
  }
  else{
      alert("Prontinho!");
  }

}

function enviarWhatsApp() {
    const numero = '5521974096726'; // Substitua pelo número de telefone
    const mensagem = 'Olá, gostaria de saber mais sobre...'; // Mensagem que deseja enviar
    const url = `https://wa.me/${5521974096726}?text=${encodeURIComponent('Olá,gostaria de saber mais sobre...')}`;
    window.open(url, '_blank');
}