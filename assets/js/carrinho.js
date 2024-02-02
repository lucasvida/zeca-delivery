let carrinhoString = sessionStorage.getItem("carrinho");
let carrinhoGerado = JSON.parse(carrinhoString);

const carrinhoCompras = document.querySelector(".itens-carrinho");
const subtotal = document.querySelector(".subtotal");
const subtotalItens = document.querySelector(".subtotal-itens");
const itensCarrinhoQuantidade = document.querySelector(".icone-carrinho");
let somaPrecos = 0;
let totalItens = 0;


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
    } title="${
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
          <button type="button" class="btn-quantidade" id="btn-menos-${produto.id}">-</button>
              <input type="text" value="${produto.quantidade}" class="input-quantidade" id="input-quantidade-${produto.id}" inputmode="numeric">
          <button type="button" class="btn-quantidade" id="btn-mais-${produto.id}">+</button>
        </div>
            </div>
                </div>
                
            </div>
            
            <hr>
        </td>
    `;

    let btnMenos = document.querySelector(`#btn-menos-${produto.id}`);
    let btnMais = document.querySelector(`#btn-mais-${produto.id}`);
    let inputQuantidade = document.querySelector(`#input-quantidade-${produto.id}`);
    
    btnMenos.addEventListener('click',()=>{
      if( inputQuantidade.value > 0){
        inputQuantidade.value = parseInt(inputQuantidade.value) - 1;
        produto.quantidade = parseInt(inputQuantidade.value);
        totalItensCarrinho();
      }
    })
    
    btnMais.addEventListener('click',()=>{
      inputQuantidade.value = parseInt(inputQuantidade.value) + 1;
      produto.quantidade = parseInt(inputQuantidade.value);
      totalItensCarrinho();
    })
  }


}

for (let i = 0; i < carrinhoGerado.length; i++) {
  somaPrecos += carrinhoGerado[i].preco * carrinhoGerado[i].quantidade;
}

//Verifica o total de Itens
function totalItensCarrinho(){
  totalItens = 0;
  for (let i = 0; i < carrinhoGerado.length; i++){
    totalItens += carrinhoGerado[i].quantidade;
  }
  subtotalItens.innerText = totalItens;
}

//Fazer um if
itensCarrinhoQuantidade.innerText = totalItens;

//Inicializa o Carrinho com quantidade básica de itens.
subtotalItens.innerText = carrinhoGerado.length;
subtotalItens.classList.add("valor-da-compra");


subtotal.innerHTML = `<div class="valor-da-compra">${somaPrecos.toLocaleString(
  "pt-BR",
  {
    style: "currency",
    currency: "BRL",
  }
)}</div>`;
