let carrinhoString = sessionStorage.getItem('carrinho');
let carrinhoGerado = JSON.parse(carrinhoString);
let carrinhoCompras = document.querySelector('.itens-carrinho')

window.addEventListener("load", ()=> {
    carrinhoGerado != null ? renderizaCarrinho() : alert('vazio');
  });

  function renderizaCarrinho (){
    for (let produto of carrinhoGerado){
        carrinhoCompras.innerHTML += `
        <td>
            <div class="produto-listado">
            <img src="${produto.imagem}" alt="${produto.nome}" class="img-tumb-carrinho">
                <div class="info-produto">
                <b>${produto.nome}</b><br>
                <span class="categoria">${produto.categoria} | ${produto.sku}</span><br><br>
                <span class="preco">${produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span><br>
                </div>
            </div>
        </td>
    `;
    }
  }