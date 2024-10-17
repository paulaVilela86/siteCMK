const supabaseUrl = 'https://hgkpreqzpcvuukrbuiys.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhna3ByZXF6cGN2dXVrcmJ1aXlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE5MDg0MTIsImV4cCI6MjAzNzQ4NDQxMn0.8dWfWxBU2tRq0L_yXtDaZCdC5qbl-AOefGFNZUxgAHU'
const dbClient = supabase.createClient(supabaseUrl, supabaseKey)
let fotoCrianca = ""

window.onload = function() {
  // Chama o método para carregar as crianças quando a página for carregada
  GetCriancasCadastradas();
};

function abrirPopupIncricao(){
  // Senha hardcoded
  const senhaCorreta = "@p@drinh@mentoCMK";  // Substitua pela senha desejada

  // Solicitar a senha ao usuário
  let senhaDigitada = prompt("Digite a senha para acessar o cadastro:");

  // Verifica se a senha está correta
  if (senhaDigitada === senhaCorreta) {
    let modal = document.querySelector("#modal");
    modal.style.display = "flex"; // Exibe o modal
  } else {
    alert("Senha incorreta!");  // Exibe um alerta se a senha estiver errada
  }
}

let fundoModal = document.querySelector("#closeModal")
fundoModal.addEventListener("click",()=> {
  let popup = document.querySelector("#modal")
  popup.style.display="none"
})


document.getElementById("botaoCadastrarCrianca").addEventListener("click",enviaCadastro)

function ValidaFormulario(){
  if(document.getElementById("nomeCrianca").value != "" && document.getElementById("idade").value != ""){
    return true;
  }
  else{
    return false;
  }
}


async function enviaCadastro() {

    if(!ValidaFormulario()){
        alert("Falta preencher nome ou idade.");
        return;
    }

    let nomePadrinho = document.getElementById("padrinho").value
    if(nomePadrinho == "")
    {
      nomePadrinho = undefined
    }

    var objeto = {
        nome: document.getElementById("nomeCrianca").value,
        idade: document.getElementById("idade").value,
        tamanhoRoupa: document.getElementById("tamanhoRoupa").value,
        tamanhoSapato: document.getElementById("tamanhoSapato").value,
        padrinho: nomePadrinho,
        foto: fotoCrianca,
    }

    console.log(objeto)

    const { error } = await dbClient
    .from('apadrinhamento')
    .insert(objeto)

   console.log(error)

   
    
    alert("Prontinho!");
}

window.addEventListener('load', function() {
  document.querySelector('input[type="file"]').addEventListener('change', function() {
      if (this.files && this.files[0]) {
          var img = document.querySelector('#myImg');
          img.onload = () => {
              URL.revokeObjectURL(img.src);  // no longer needed, free memory
          }
          getBase64(this.files[0]);

          img.src = URL.createObjectURL(this.files[0]); // set src to blob url
      }
  });
});

function getBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    fotoCrianca = reader.result;
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}


async function GetCriancasCadastradas(){
  document.querySelector("#criancas").innerHTML=""

  const { data, error } = await dbClient
  .from('apadrinhamento')
  .select()

  console.log(error)

  data.forEach(element => {
    RenderCrianca(element)
  });
}

function RenderCrianca(item){
  var template = `
          <div class="crianca">
            <div>
              <img id="foto" src="${item.foto}" style="width:72px;height:128px;">    
            </div>
            <div>
              <fieldset>
                <p for="nome">Nome: ${item.nome}</p>
              </fieldset>
              <fieldset>
                <p for="idade">Idade: ${item.idade}</p>
              </fieldset>
              <fieldset>
                <p for="roupa">Roupa: ${item.tamanhoRoupa}</p>
              </fieldset>
              <fieldset>
                <p for="sapato">Sapato: ${item.tamanhoSapato}</p>
              </fieldset>`;

      if(item.padrinho == undefined)
      {
        template += `
              <fieldset>
                <button id="botaoApadrinhar" onclick="abrirModalApadrinhamento('${item.id}')">Apadrinhar</button>
              </fieldset>`;
      }
     
      template += `
        </div>
      </div> `;


  let criancas = document.querySelector("#criancas");
  criancas.innerHTML+=template;

}

let idCriancaSelecionada = null; // Variável global para armazenar o ID da criança selecionada

function abrirModalApadrinhamento(idCrianca) {
  idCriancaSelecionada = parseInt(idCrianca); // Armazena o ID da criança
  let modal = document.querySelector("#modalApadrinhamento");
  modal.style.display = "flex";
}

// Fechar o modal de apadrinhamento
let fecharModalApadrinhamento = document.querySelector("#closeModalApadrinhamento");
fecharModalApadrinhamento.addEventListener("click", () => {
  let modal = document.querySelector("#modalApadrinhamento");
  modal.style.display = "none";
});

async function enviarApadrinhamento() {
  let nomePadrinho = document.getElementById("nomePadrinho").value;
  let telefonePadrinho = document.getElementById("telefonePadrinho").value;

  if (!nomePadrinho) {
    alert("Por favor, insira seu nome.");
    return;
  }

  console.log({ padrinho: nomePadrinho, id: idCriancaSelecionada})

  // Atualiza o registro no banco de dados
  const { error } = await dbClient
    .from('apadrinhamento')
    .update({ padrinho: nomePadrinho, telefone_padrinho: telefonePadrinho })
    .eq('id', idCriancaSelecionada); // Utiliza o ID da criança armazenado

  if (error) {
    console.error("Erro ao apadrinhar a criança:", error);
  } else {
    alert("Obrigado por apadrinhar uma criança!");
    let modal = document.querySelector("#modalApadrinhamento");
    modal.style.display = "none";
    
    // Atualiza a lista de crianças
    GetCriancasCadastradas();
  }
}

function enviarWhatsApp() {
  const numero = '5521974096726'; // Substitua pelo número de telefone
  const mensagem = 'Olá, gostaria de saber mais sobre...'; // Mensagem que deseja enviar
  const url = `https://wa.me/${5521974096726}?text=${encodeURIComponent('Olá,gostaria de saber mais sobre...')}`;
  window.open(url, '_blank');
}