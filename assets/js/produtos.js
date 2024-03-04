/* PRODUTOS COMO OBJETO - ORIGINAL

let produtos = [
  {
    id: "01",
    nome: "Cerveja Amstel - 600ml",
    sku: "AMS600ML",
    preco: 6.87,
    categoria: "Cerveja",
    imagem: "../assets/img/produtos/cerveja-amstel-600-ml.png",
    quantidade: 1,
  },
  {
    id: "02",
    nome: "Cerveja Heineken - Long Neck - 350ml",
    sku: "HEI350ML",
    preco: 5.55,
    categoria: "Cerveja",
    imagem: "../assets/img/produtos/cerveja-heineken-350-ml.png",
    quantidade: 1,
  },
  {
    id: "03",
    nome: "Refrigerante Lata Pepsi - 350ml",
    sku: "PEPSI350ML",
    preco: 3.99,
    categoria: "Refrigerante",
    imagem: "../assets/img/produtos/refri-pepsi-350-ml.png",
    quantidade: 1,
  },
  {
    id: "04",
    nome: "Água Mineral - Sem Gás - 500ml",
    sku: "AGUSG500ML",
    preco: 3.5,
    categoria: "Mercearia",
    imagem: "../assets/img/produtos/agua-mineral-sem-gas-500ml.png",
    quantidade: 1,
  },
  {
    id: "05",
    nome: "Água Mineral - Com Gás - 500ml",
    sku: "AGUCG500ML",
    preco: 4.0,
    categoria: "Mercearia",
    imagem: "../assets/img/produtos/agua-mineral-com-gas-500ml.png",
    quantidade: 1,
  },
  {
    id: "06",
    nome: "Pacote de Gelo - Escama - 4kg",
    sku: "GELO4KG",
    preco: 10.0,
    categoria: "Mercearia",
    imagem: "../assets/img/produtos/pacote-gelo-4-kg.png",
    quantidade: 1,
  },
  {
    id: "07",
    nome: "Pacote de Gelo - Escama - 10kg",
    sku: "GELO10KG",
    preco: 14.99,
    categoria: "Mercearia",
    imagem: "../assets/img/produtos/pacote-gelo-10-kg.png",
    quantidade: 1,
  },
  {
    id: "08",
    nome: "Pacote de Carvão - 3kg",
    sku: "CAR3KG",
    preco: 13.99,
    categoria: "Mercearia",
    imagem: "../assets/img/produtos/pacote-carvao-3-kg.png",
    quantidade: 1,
  },
];

*/

let carrinho = [];
const grid = document.querySelector(".produtos");
const iconeCarrinho = document.querySelector(".icone-carrinho-fixo");
const labelQuantidadeCarrinho = document.querySelector(
  ".label-quantidade-carrinho"
);

//Acessando os produtos como JSON:

async function getData() {
  try {
    const url = await fetch("../assets/json/produtos.json");
    const dados = await url.json();

    function filtraPorCategoria(categoriaSelecionada) {
      grid.innerHTML = "";

      const produtosFiltrados = categoriaSelecionada
        ? dados.filter((produto) => produto.categoria === categoriaSelecionada)
        : dados;

      produtosFiltrados.forEach((produto) => renderizaProduto(produto));
    }

    dados.forEach(function (produto) {
      renderizaProduto(produto);
    });

    document
      .getElementById("filtroCategoria")
      .addEventListener("change", function (event) {
        const categoriaSelecionada = event.target.value;
        filtraPorCategoria(categoriaSelecionada);
      });
  } catch (e) {
    grid.innerHTML = "<h2>Não foi possível acessar os produtos";
  }
}

getData();

function renderizaProduto(produto) {
  let criaEl = document.createElement("div");
  criaEl.classList.add("produtos-card");
  criaEl.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <div class="produto-nome">${produto.nome}</div>
      <div class="categoria">Categoria: ${produto.categoria} <br> <em> ${
    produto.sku
  }</em></div>
      <div class="produto-preco">
      ${produto.preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}<br>
      </div>
      <button class="cta-comprar"> Comprar </button>
  `;

  grid.append(criaEl);

  let btn = criaEl.querySelector("button");
  btn.addEventListener("click", () => {
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      sku: produto.sku,
      preco: produto.preco,
      categoria: produto.categoria,
      imagem: produto.imagem,
      quantidade: produto.quantidade || 1,
    });

    atualizaCarrinho();
    iconeCarrinho.style.display = "block";
    labelQuantidadeCarrinho.innerText = carrinho.length;

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Produto adicionado com sucesso",
      showConfirmButton: false,
      timer: 1500,
    });
  });
}

function atualizaCarrinho() {
  let carrinhoArmazenado = JSON.stringify(carrinho);
  sessionStorage.setItem("carrinho", carrinhoArmazenado);
}

// // função o filtro - ORIGINAL

// function filtraPorCategoria(categoriaSelecionada) {
//   grid.innerHTML = "";

//   const produtosFiltrados = categoriaSelecionada
//     ? produtos.filter((produto) => produto.categoria === categoriaSelecionada)
//     : produtos;

//   produtosFiltrados.forEach((produto) => renderizaProduto(produto));
// }

// produtos.forEach(function (produto) {
//   renderizaProduto(produto);
// });

// document
//   .getElementById("filtroCategoria")
//   .addEventListener("change", function (event) {
//     const categoriaSelecionada = event.target.value;
//     filtraPorCategoria(categoriaSelecionada);
//   });
