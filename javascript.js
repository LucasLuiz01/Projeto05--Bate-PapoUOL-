let nome = "";
function salvarNome() {
  //entrando na sala
  nome = prompt("Qual o seu nome?");
  const salvar = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/participants ",
    { name: nome }
  );

  salvar
    .then((resposta) => {
      if (resposta.status != 200) {
        return salvarNome();
      }
    })
    .catch((erro) => {
      return salvarNome();
    });
}

function buscarNome() {
  const promessa = axios.get(
    "https://mock-api.driven.com.br/api/v6/uol/messages"
  );
  promessa.then(renderizarMensagens);
  //promessa.catch(mostrarErro);
}
let arrayData = [];
let listaDeMenssagens

function renderizarMensagens(menssagem) {
 listaDeMenssagens = document.querySelector(".corpoMensagens");
  arrayData = menssagem.data;
  console.table(arrayData);
  listaDeMenssagens.innerHTML = "";
  for (let i = 0; i < arrayData.length; i++) {
    listaDeMenssagens.innerHTML += `
        <div class="chat ${arrayData[i].type}">
            <span class="tempo"> ${montaMensagem(arrayData[i])} </span>
        </div>
        `;
  }
  listaDeMenssagens.innerHTML += "</div>";
  console.log(listaDeMenssagens);
  listaDeMenssagens.children[listaDeMenssagens.children.length - 1].scrollIntoView();
}

function montaMensagem(mensagem) {
  if (mensagem.type === "status") {
    return `<span class="time">(${mensagem.time})</span> <strong>${mensagem.from}</strong> ${mensagem.text}`;
  }

  return `<span class="time">(${mensagem.time})</span> <strong>${mensagem.from}</strong> para <strong>${mensagem.from}</strong>: ${mensagem.text}`;
}
setInterval(buscarNome, 3000);

salvarNome();
function manterConexao() {
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status', { name: nome }).then();
}

setInterval(manterConexao, 5000);
function eviarMensagen() {
    const textoEscrito = document.querySelector('.mensagem');
    const textoEnviado = textoEscrito.value;
    const salvar = axios.post(
        "https://mock-api.driven.com.br/api/v6/uol/messages",
        { from: nome,
        to: "Todos",
        text: textoEnviado,
        type: "message"  }
      );
      salvar.then(() => { 
        buscarNome();
        textoEscrito.value = ""; 
      });
      salvar.catch(naoenvioumensagens);

}
function naoenvioumensagens(respostas){
    window.location.reload();


}
buscarNome();