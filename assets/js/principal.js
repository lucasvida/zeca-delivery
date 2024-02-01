//JS Comum para todo site

let menu = document.querySelector('.btn-menu');
let menuOffCanvas = document.querySelector('.menu-off-canvas');
let menuClose = document.querySelector('.close-menu');

function abreMenu(){
    menuOffCanvas.style.cssText = "margin:0;";
  }
  

function fechaMenu(){
  menuOffCanvas.style.cssText = "margin-left: -300px;";
}

 
menu.addEventListener("click",abreMenu);
menuClose.addEventListener("click",fechaMenu);