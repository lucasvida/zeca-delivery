const slider = document.querySelector(".slider-banners");
const btnPrev = document.querySelector("#btn-slider-prev");
const btnNext = document.querySelector("#btn-slider-next");

let arrayImgGaleria = [];

if (window.innerWidth < 600) {
  arrayImgGaleria = [
    "assets/img/banner-zecadelivery-mobile-01.png",
    "assets/img/banner-zecadelivery-mobile-02.png",
    "assets/img/banner-zecadelivery-mobile-03.png",
  ];
} else {
  arrayImgGaleria = [
    "assets/img/banner-zecadelivery-desktop-01.png",
    "assets/img/banner-zecadelivery-desktop-02.png",
    "assets/img/banner-zecadelivery-desktop-03.png",
  ];
}

let contadorArray = arrayImgGaleria.length;
let sliderInicial = 0;

btnPrev.addEventListener("click", () => {
  if (sliderInicial <= 0) {
    slider.innerHTML = `<img src="${
      arrayImgGaleria[contadorArray - 1]
    }" loading="lazy" alt="Banner Zeca Delivery">`;
    sliderInicial = contadorArray - 1;
  } else {
    slider.innerHTML = `<img src="${
      arrayImgGaleria[sliderInicial - 1]
    }" loading="lazy" alt="Banner Zeca Delivery">`;
    sliderInicial = sliderInicial - 1;
    console.log(sliderInicial);
  }
});

btnNext.addEventListener("click", () => {
  if (sliderInicial <= contadorArray - 2) {
    sliderInicial = sliderInicial + 1;
    slider.innerHTML = `<img src="${arrayImgGaleria[sliderInicial]}" loading="lazy" alt="Banner Zeca Delivery">`;
    console.log(sliderInicial);
  } else {
    sliderInicial = 0;
    slider.innerHTML = `<img src="${arrayImgGaleria[sliderInicial]}" loading="lazy" alt="Banner Zeca Delivery" >`;
  }
});

/* Controle Móbile */

const sliderMob = document.querySelector(".slider-banners-mob");
const btnPrevMob = document.querySelector("#btn-slider-prev-mob");
const btnNextMob = document.querySelector("#btn-slider-next-mob");

btnPrevMob.addEventListener("click", () => {
  if (sliderInicial <= 0) {
    sliderMob.innerHTML = `<img src="${
      arrayImgGaleria[contadorArray - 1]
    }" loading="lazy" alt="Banner Zeca Delivery">`;
    sliderInicial = contadorArray - 1;
  } else {
    sliderMob.innerHTML = `<img src="${
      arrayImgGaleria[sliderInicial - 1]
    }" loading="lazy" alt="Banner Zeca Delivery">`;
    sliderInicial = sliderInicial - 1;
    console.log(sliderInicial);
  }
});

btnNextMob.addEventListener("click", () => {
  if (sliderInicial <= contadorArray - 2) {
    sliderInicial = sliderInicial + 1;
    sliderMob.innerHTML = `<img src="${arrayImgGaleria[sliderInicial]}" loading="lazy" alt="Banner Zeca Delivery">`;
    console.log(sliderInicial);
  } else {
    sliderInicial = 0;
    sliderMob.innerHTML = `<img src="${arrayImgGaleria[sliderInicial]}" loading="lazy" alt="Banner Zeca Delivery" >`;
  }
});
