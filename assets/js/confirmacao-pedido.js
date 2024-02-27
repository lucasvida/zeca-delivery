const confirmacaoPedido = document.querySelector(".confirmacao-pedido");

setTimeout(() => {
  confirmacaoPedido.innerHTML = `<div class="animate__animated animate__fadeInLeft"><img src="../assets/img/pedido-preparado.gif" alt="Pedido Confirmado"></div>`;
}, 5000);

setTimeout(() => {
  confirmacaoPedido.innerHTML = `<div class="animate__animated animate__fadeInLeft"><img src="../assets/img/saiu-para-entrega.gif" alt="Pedido Saiu para Entrega"></div>`;
}, 10000);

setTimeout(() => {
  confirmacaoPedido.innerHTML = `<div class="animate__animated animate__fadeInLeft"> <img src="../assets/img/pedido-entregue.gif" alt="Pedido entregue"> </div>`;
}, 15000);

setTimeout(() => {
  confirmacaoPedido.innerHTML = `<div class="animate__animated animate__fadeInLeft"> <img src="../assets/img/avaliacao.gif" alt="Avalie seu pedido"> </div>`;
}, 20000);
