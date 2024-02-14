/* Recupera informações do carrinho com a quantidade
final de itens e valor final*/

const carrinhoFinalizadoValores = JSON.parse(
  sessionStorage.getItem("carrinhoFinalizado")
);

const cep = document.querySelector("#cep");
const formEntrega = document.querySelector("form");
const dadosEntrega = document.querySelector(".dados-entrega");
const inputs = document.querySelectorAll(".dados-entrega-inputs");

const totalItens = document.querySelector(".subtotal-itens");
const totalValor = document.querySelector(".subtotal");

const metodo = document.querySelector(".metodo-escolhido");
const inputMetodo = document.querySelectorAll("input[type=radio");

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

//Validação do metódo de pagamento escolhido.

for (let input of inputMetodo) {
  input.addEventListener("click", () => {
    if (input.value === "cc") {
      metodo.innerHTML = "Pagamento com Cartão";
    } else if (input.value === "pe") {
      metodo.innerHTML = `Pagamento será efetivado na entrega. O entregador levará a maquininha.<br> será aceitos Dinheiro | Cartão de Crédido | Cartão de Débito`;
    } else if (input.value === "pi") {
      metodo.innerHTML = `<div class="pix-chave">
      <div id="pix-chave">
      <img src="../assets/img/qr-code.jpg" alt="QR Code" width="200" heigth="200">
      PIXa8fef2502b61fae87ec7cd905fb1c761a8fef2502b61fae87ec7cd905fb1c7611bf66aa331ed7c4d2fa4b5b254fd5dfd
      </div>
  </div>
  <button onclick="copiarTexto()">COPIAR PIX</button>`;
    }
  });
}

function copiarTexto() {
  const pix = document.querySelector("#pix-chave");
  navigator.clipboard.writeText(pix.innerText);
  alert("ok");
}

totalItens.innerText = carrinhoFinalizadoValores.quantidadeItensFinal;
const totalValorFinal = parseFloat(carrinhoFinalizadoValores.subtotalFinal) + 5;
totalValor.innerHTML = totalValorFinal.toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL",
});
