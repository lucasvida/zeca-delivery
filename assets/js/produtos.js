let produtos = [
    {
      id: '01',
      nome: 'Cerveja Amstel - 600ml',
      sku: 'AMS600ML',
      preco: 6.87,
      categoria: 'Cerveja',
      imagem: '/assets/img/produtos/cerveja-amstel-600-ml.png',
      quantidade: 1,
    },
     {
      id: '02',
      nome: 'Cerveja Heineken - Long Neck - 350ml',
      sku: 'HEI350ML',
      preco: 5.55,
      categoria: 'Cerveja',
      imagem: '/assets/img/produtos/cerveja-heineken-350-ml.png',
      quantidade: 1,
    },
    {
      id: '03',
      nome: 'Refrigerante Lata Pepsi - 350ml',
      sku: 'PEPSI350ML',
      preco: 3.99,
      categoria: 'Refrigerante',
      imagem: '/assets/img/produtos/refri-pepsi-350-ml.png',
      quantidade: 1,
    },
     {
      id: '04',
      nome: 'Água Mineral - Sem Gás - 500ml',
      sku: 'AGUSG500ML',
      preco: 3.50,
      categoria: 'Água',
      imagem: '/assets/img/produtos/agua-mineral-sem-gas-500ml.png',
      quantidade: 1,
    },
    {
      id: '05',
      nome: 'Água Mineral - Com Gás - 500ml',
      sku: 'AGUCG500ML',
      preco: 4.00,
      categoria: 'Água',
      imagem: '/assets/img/produtos/agua-mineral-com-gas-500ml.png',
      quantidade: 1,
    },
    {
      id: '06',
      nome: 'Pacote de Gelo - Escama - 4kg',
      sku: 'GELO4KG',
      preco: 10.00,
      categoria: 'Gelo',
      imagem: '/assets/img/produtos/pacote-gelo-4-kg.png',
      quantidade: 1,
    },
    {
      id: '07',
      nome: 'Pacote de Gelo - Escama - 10kg',
      sku: 'GELO10KG',
      preco: 14.99,
      categoria: 'Gelo',
      imagem: '/assets/img/produtos/pacote-gelo-10-kg.png',
      quantidade: 1,
    },
    {
      id: '08',
      nome: 'Pacote de Carvão - 3kg',
      sku: 'CAR3KG',
      preco: 13.99,
      categoria: 'Carvão',
      imagem: '/assets/img/produtos/pacote-carvao-3-kg.png',
      quantidade: 1,
    }
  ]
  
  let carrinho = [];
  const grid = document.querySelector('.produtos');
  
  for (let i of produtos){
      let criaEl = document.createElement('div');
      criaEl.innerHTML = 
      `
      <img src="${i.imagem}" alt="${i.nome}">
      <b>${i.nome}</b><br>
      Categoria:${i.categoria}<br>
      ${i.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}<br>
      <button> Comprar </button>
  
      `;
      
      grid.append(criaEl);
  
      let btn = criaEl.querySelector('button');
      btn.addEventListener('click', () => {
          class Produto {
          constructor(id, nome, sku, preco, categoria, imagem, quantidade) {
              this.id = id;
              this.nome = nome;
              this.sku = sku;
              this.preco = preco;
              this.categoria = categoria;
              this.imagem = imagem;
              this.quantidade = quantidade;
    }
  }
      let produtoAdd = new Produto (i.id, i.nome, i.sku, i.preco, i.categoria, i.imagem, i.quantidade);
      carrinho.push(produtoAdd);
  
      let carrinhoArmazenado = JSON.stringify(carrinho);
      sessionStorage.setItem('carrinho', carrinhoArmazenado);
    });
  }