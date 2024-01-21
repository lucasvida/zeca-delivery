const slider = document.querySelector(".slider-banners");
const btnPrev = document.querySelector("#btn-slider-prev");
const btnNext = document.querySelector("#btn-slider-next");

let arrayImgGaleria = [
  "assets/img/banner-zecadelivery-desktop-01.png",
  "assets/img/banner-zecadelivery-desktop-02.png",
  "assets/img/banner-zecadelivery-desktop-03.png",
];

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
