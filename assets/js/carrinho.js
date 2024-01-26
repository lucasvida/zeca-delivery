let carrinhoString = sessionStorage.getItem("carrinho");
let carrinhoGerado = JSON.parse(carrinhoString);
let carrinhoCompras = document.querySelector(".itens-carrinho");
const subtotal = document.querySelector(".subtotal");
const subtotalItens = document.querySelector(".subtotal-itens");
const itensCarrinhoQuantidade = document.querySelector(".icone-carrinho");
let somaPrecos = 0;

window.addEventListener("load", () => {
  carrinhoGerado != null ? renderizaCarrinho() : alert("vazio");
});

function renderizaCarrinho() {
  for (let produto of carrinhoGerado) {
    carrinhoCompras.innerHTML += `
        <td>
            <div class="produto-listado">
            <img src="${produto.imagem}" alt="${
      produto.nome
    }" class="img-tumb-carrinho">
                <div class="info-produto">
                <b>${produto.nome}</b><br>
                <span class="categoria">${produto.categoria} | ${
      produto.sku
    }</span><br><br>
                <span class="preco">${produto.preco.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}<br>
                
                </div>
            </div>
            <hr>
        </td>
    `;
  }
}

for (let i = 0; i < carrinhoGerado.length; i++) {
  somaPrecos += carrinhoGerado[i].preco;
}
subtotalItens.innerText = carrinhoGerado.length;
subtotalItens.classList.add("valor-da-compra");

//Fazer um if
itensCarrinhoQuantidade.innerText = carrinhoGerado.length;

subtotal.innerHTML = `<div class="valor-da-compra">${somaPrecos.toLocaleString(
  "pt-BR",
  {
    style: "currency",
    currency: "BRL",
  }
)}</div>`;
