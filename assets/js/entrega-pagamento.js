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

const cartaoNumero = document.querySelectorAll(".data-cc");

const valorFrete = document.querySelector('.valor-frete');
let totalValorFinal = parseFloat(carrinhoFinalizadoValores.subtotalFinal);


/* Permite que apenas números sejam digitados no input de CEP.
Ao digitar 8 digitos ele perde o "foco" exibe os demais inputs com auto preenchimento */
cep.addEventListener("keyup", () => {
  cep.value = cep.value.replace(/[^0-9]/gi, "");
  if (cep.value.length === 8) {
    dadosEntrega.style.visibility = "visible";
    dadosEntrega.style.display = "block";
    formEntrega.numero.focus();
  }
});

cep.addEventListener("blur", () => {
  for (validaDados of inputs) {
    validaDados.value = "";
  }
  getData(cep.value);
});

/* Consulta API VIA CEP*/
async function getData(cep) {
  try {
    const url = await fetch("https://viacep.com.br/ws/" + cep + "/json/");
    const dados = await url.json();
    if (dados.uf === undefined) {
      alert("CEP Inexistente ou não atendido pelo app");
      dadosEntrega.style.visibility = "hidden";
      valorFrete.style.visibility = "hidden";
      totalValorFinal = parseFloat(carrinhoFinalizadoValores.subtotalFinal);
      totalValor.innerHTML = totalValorFinal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
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
      valorFrete.style.visibility = "visible";
      totalValorFinal = totalValorFinal + 5;
      totalValor.innerHTML = totalValorFinal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
     });
    }
  } catch (erro) {
    console.log(erro);
  }
}


//Validação do metódo de pagamento escolhido.

for (let input of inputMetodo) {
  input.addEventListener("click", () => {
    if (input.value === "cc") {
      metodo.innerHTML = `<div class="cartao-credito">
      <input type="text" id="numero-cc" inputmode="numeric" placeholder="Número do Cartão" class="input-maior data-cc" maxlength="19">
      <input type="text" id="nome-cc" placeholder="Número do Titular" class="input-maior" >
      <div class="cartao-extra-info">
          <div>
              <input type="text" id="cvv-cc" placeholder="CVV" class="input-menor data-cc" maxlength="3">
          </div>
          <div>
              <input type="text" id="mes-cc" placeholder="Mês (MM)" inputmode="numeric" class="input-menor data-cc" maxlength="2">/
              <input type="text" id="ano-cc" placeholder="Ano (AA)" inputmode="numeric" class="input-menor data-cc" maxlength="2">
          </div>
      </div>
  </div>`;
    } else if (input.value === "pe") {
      metodo.innerHTML = `<div class="pagamento-entrega">Pagamento será efetivado na entrega. O entregador levará a maquininha. Será aceito Dinheiro | Cartão de Crédido | Cartão de Débito.</div>`;
    } else if (input.value === "pi") {
      metodo.innerHTML = `<div class="pix-chave">
      <img src="../assets/img/qr-code.jpg" alt="QR Code">
      <div id="pix-chave">
      PIXa8fef2502b61fae87ec7cd905fb1c761a8fef2502b61fae87ec7cd905fb1c7611bf66aa331ed7c4d2fa4b5b254fd5dfd
      </div>
      <button onclick="copiarTexto()" class="pix-btn">COPIAR PIX 📑</button>
  </div>
 `;
    }
  });
}

  for (let dadosCartao of cartaoNumero){
    dadosCartao.addEventListener("keyup", ()=>
  {
    dadosCartao.value = dadosCartao.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  });
  }

function copiarTexto() {
  const pix = document.querySelector("#pix-chave");
  navigator.clipboard.writeText(pix.innerText);
  alert("Código PIX copiado com sucesso");
}

totalItens.innerText = carrinhoFinalizadoValores.quantidadeItensFinal;
totalValor.innerHTML = totalValorFinal.toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL",
});
