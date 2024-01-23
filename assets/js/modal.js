const modal = document.querySelector('#modal');
const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const btnModalSim = document.querySelector('#btn-modal-sim');
const btnModalNao = document.querySelector('#btn-modal-nao');
let maiorDeIdade = sessionStorage.getItem('maiorDeIdade');

if (maiorDeIdade === 'Não' || maiorDeIdade === null){
    modalOpen();
} else {
    closeModal();
}

function modalOpen() {
header.classList.add('modal-open');
main.classList.add('modal-open');
footer.classList.add('modal-open');
}

function closeModal() {
    modal.style.display = 'none';
    header.classList.remove('modal-open');
    main.classList.remove('modal-open');
    footer.classList.remove('modal-open');
}

btnModalNao.addEventListener('click', ()=>{
    window.location.replace('/zeca-delivery/paginas/erro-menor-idade.html')
    sessionStorage.setItem('maiorDeIdade', 'Não');
})

btnModalSim.addEventListener('click', ()=>{
    sessionStorage.setItem('maiorDeIdade', 'Sim');
    closeModal();
})





