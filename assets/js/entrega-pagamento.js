/* Recupera informações do carrinho com a quantidade
final de itens e valor final*/

const carrinhoFinalizadoValores = JSON.parse(
  sessionStorage.getItem("carrinhoFinalizado")
);

const cep = document.querySelector("#cep");
const formEntrega = document.querySelector("form");
const dadosEntrega = document.querySelector(".dados-entrega");
const inputs = document.querySelectorAll(".dados-entrega-inputs");

/* Permite que apenas números sejam digitados no input de CEP.
Ao digitar 8 digitos ele perde o "foco" exibe os demais inputs com auto preenchimento */
cep.addEventListener("keyup", () => {
  cep.value = cep.value.replace(/[^0-9]/gi, "");
  if (cep.value.length === 8) {
    dadosEntrega.style.visibility = "visible";
    formEntrega.numero.focus();
  }
});

/* Consulta API VIA CEP*/
async function getData(cep) {
  try {
    const url = await fetch("https://viacep.com.br/ws/" + cep + "/json/");
    const dados = await url.json();
    if (dados.uf === undefined) {
      alert("CEP Inexistente ou não atendido pelo app");
      dadosEntrega.style.visibility = "hidden";
      cep.value = "";
      cep.focus();
    } else {
      formEntrega.rua.value = dados.logradouro;
      formEntrega.bairro.value = dados.bairro;
      formEntrega.cidade.value = dados.localidade;
      formEntrega.estado.value = dados.uf;
      //Valida os inputs que já estão preenchidos e bloqueia para alterações.
      for (validaDados of inputs) {
        if (validaDados.value != "") {
          validaDados.setAttribute("readOnly", "true");
          validaDados.classList.add("dados-entrega-validacao");
        }
      }
    }
  } catch (erro) {
    console.log(erro);
  }
}

cep.addEventListener("blur", () => {
  for (validaDados of inputs) {
    validaDados.value = "";
  }
  getData(cep.value);
});
