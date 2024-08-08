const supabaseUrl = 'https://hgkpreqzpcvuukrbuiys.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhna3ByZXF6cGN2dXVrcmJ1aXlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE5MDg0MTIsImV4cCI6MjAzNzQ4NDQxMn0.8dWfWxBU2tRq0L_yXtDaZCdC5qbl-AOefGFNZUxgAHU'
const dbClient = supabase.createClient(supabaseUrl, supabaseKey)
let fotoCrianca = ""

function abrirPopupIncricao(){
  let popup = document.querySelector("#modal")
  popup.style.display="flex"
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

    var objeto = {
        nome: document.getElementById("nomeCrianca").value,
        idade: document.getElementById("idade").value,
        tamanhoRoupa: document.getElementById("tamanhoRoupa").value,
        tamanhoSapato: document.getElementById("tamanhoSapato").value,
        foto: fotoCrianca,
    }

    console.log(objeto)

    const { error } = await dbClient
    .from('apadrinhamento')
    .insert(objeto)

   console.log(error)

    let popup = document.querySelector("#modal")
    popup.style.display="none"

    GetCriancasCadastradas()
    
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
  const template = `
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
          </fieldset>
        </div>
      </div>`;

  let criancas = document.querySelector("#criancas");
  criancas.innerHTML+=template;

}
