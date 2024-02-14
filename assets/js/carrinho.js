let carrinhoString = sessionStorage.getItem("carrinho");
let carrinhoGerado = JSON.parse(carrinhoString);
let carrinhoFinalizado = {
  quantidadeItensFinal: 0,
  subtotalFinal: 0,
};

const carrinhoCompras = document.querySelector(".itens-carrinho");
const subtotal = document.querySelector(".subtotal");
const subtotalItens = document.querySelector(".subtotal-itens");
const itensCarrinhoQuantidade = document.querySelector(".icone-carrinho");
let somaPrecos = 0;
let totalItens = 0;
let novoTotalDesc;

window.addEventListener("load", () => {
  carrinhoGerado != null ? renderizaCarrinho() : alert("vazio");
});

function renderizaCarrinho() {
  for (let produto of carrinhoGerado) {
    carrinhoCompras.innerHTML += `
        <td>
            <div class="produto-listado">
            <img src="${produto.imagem}" alt="${produto.nome} title="${
      produto.nome
    }" class="img-tumb-carrinho">
                <div class="info-produto">
                <b>${produto.nome}</b><br>
                <span class="categoria">${produto.categoria} | ${
      produto.sku
    }</span><br><br>
                
            <div class="preco-seletor">
            <span class="preco">${produto.preco.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}</span>
            <div class="seletor-quantidade">
          <button type="button" class="btn-quantidade" id="btn-menos-${
            produto.id
          }" aria-label="Reduz itens do produto ${
      produto.nome
    }" data-menosid="${produto.id}">-</button>
              <input type="text" value="${
                produto.quantidade
              }" class="input-quantidade" id="input-quantidade-${
      produto.id
    }" inputmode="numeric" readonly="true" data-inputid="${produto.id}">
          <button type="button" class="btn-quantidade" id="btn-mais-${
            produto.id
          }" aria-label="Adiciona itens do produto ${
      produto.nome
    }" data-maisid="${produto.id}">+</button>
        </div>
            </div>
                </div>
                
            </div>
            
            <hr>
        </td>
    `;

    const btnMenos = document.querySelectorAll("button[data-menosid]");
    const btnMais = document.querySelectorAll("button[data-maisid]");

    for (let i of btnMenos) {
      i.addEventListener("click", () => {
        let inputQuantidade = document.querySelector(
          `#input-quantidade-${i.getAttribute("data-menosid")}`
        );

        if (inputQuantidade.value > 0) {
          inputQuantidade.value = parseInt(inputQuantidade.value) - 1;

          for (let produto of carrinhoGerado) {
            if (produto.id === i.getAttribute("data-menosid")) {
              produto.quantidade = parseInt(inputQuantidade.value);
              break; // Se encontrou o produto, não precisa continuar o loop
            }
          }
          produto.quantidade = parseInt(inputQuantidade.value);
          totalItensCarrinho();
          totalItensSoma();
          aplicaDesconto();
          if (inputQuantidade.value <= 0) {
            alert("remover");
          }
        }
      });
    }

    for (let i of btnMais) {
      i.addEventListener("click", () => {
        let inputQuantidade = document.querySelector(
          `#input-quantidade-${i.getAttribute("data-maisid")}`
        );
        inputQuantidade.value = parseInt(inputQuantidade.value) + 1;

        for (let produto of carrinhoGerado) {
          if (produto.id === i.getAttribute("data-maisid")) {
            produto.quantidade = parseInt(inputQuantidade.value);
            break; // Se encontrou o produto, não precisa continuar o loop
          }
        }
        totalItensCarrinho();
        totalItensSoma();
        aplicaDesconto();
      });
    }
  }
}

let descontos = [
  {
    desconto: "10OFF",
    valor: 10,
  },
  {
    desconto: "15OFF",
    valor: 15,
  },
  {
    desconto: "20OFF",
    valor: 20,
  },
];

//Verifica Cupom de Desconto
const cupomDesconto = document.querySelector("#input-cupom-desconto");
const btnCupomDesconto = document.querySelector("#btn-cupom-desconto");

function aplicaDesconto() {
  for (promo of descontos) {
    if (promo.desconto === cupomDesconto.value.toUpperCase()) {
      novoTotal = (somaPrecos * promo.valor) / 100;
      let novoTotalDesc = somaPrecos - Math.floor(novoTotal);
      alert("Cupom Aplicado com Sucesso");
      subtotal.innerHTML = `<div class="valor-da-compra">

      <span class="preco-antigo">
      
      ${somaPrecos.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}
      
      
      </span>

      ${novoTotalDesc.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}</div>`;
      carrinhoFinalizado.subtotalFinal = novoTotalDesc;
      sessionStorage.setItem(
        "carrinhoFinalizado",
        JSON.stringify(carrinhoFinalizado)
      );
      break; // Se encontrou o produto, não precisa continuar o loop
    }
  }
}

btnCupomDesconto.addEventListener("click", aplicaDesconto);

//Verifica o total de Itens
function totalItensCarrinho() {
  totalItens = 0;
  for (let i = 0; i < carrinhoGerado.length; i++) {
    totalItens += carrinhoGerado[i].quantidade;
  }
  subtotalItens.innerText = totalItens;
  itensCarrinhoQuantidade.innerText = totalItens;
  carrinhoFinalizado.quantidadeItensFinal = totalItens;
  sessionStorage.setItem(
    "carrinhoFinalizado",
    JSON.stringify(carrinhoFinalizado)
  );
}

//Verifica o total da Soma
function totalItensSoma() {
  somaPrecos = 0;
  for (let i = 0; i < carrinhoGerado.length; i++) {
    somaPrecos += carrinhoGerado[i].preco * carrinhoGerado[i].quantidade;
  }

  subtotal.innerHTML = `<div class="valor-da-compra">${somaPrecos.toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  )}</div>`;
  carrinhoFinalizado.subtotalFinal = somaPrecos;
  sessionStorage.setItem(
    "carrinhoFinalizado",
    JSON.stringify(carrinhoFinalizado)
  );
}

//Fazer um if
itensCarrinhoQuantidade.innerText = carrinhoGerado.length;

for (let i = 0; i < carrinhoGerado.length; i++) {
  somaPrecos += carrinhoGerado[i].preco * carrinhoGerado[i].quantidade;
}

//Inicializa o Carrinho com quantidade básica de itens.
subtotalItens.innerText = carrinhoGerado.length;
subtotalItens.classList.add("valor-da-compra");
carrinhoFinalizado.quantidadeItensFinal = carrinhoGerado.length;
carrinhoFinalizado.subtotalFinal = somaPrecos;
sessionStorage.setItem(
  "carrinhoFinalizado",
  JSON.stringify(carrinhoFinalizado)
);

subtotal.innerHTML = `<div class="valor-da-compra">${somaPrecos.toLocaleString(
  "pt-BR",
  {
    style: "currency",
    currency: "BRL",
  }
)}</div>`;
