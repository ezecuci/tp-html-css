import { TarjetaCurso } from './TarjetaCurso.js';

const contenedorDeImagenes = document.querySelector('.top__image');
const imagenesDelSlide = document.querySelectorAll('.top__image img');
const btnBack = document.querySelector('.top__image-btn.back');
const btnNext = document.querySelector('.top__image-btn.next');

let index = 0;

function desplazarImagen() {

    contenedorDeImagenes.style.transform = `translateX(${-index * 100}%)`;
}

btnNext.addEventListener('click' , () => {

    index ++;
    if(index >= imagenesDelSlide.length) index = 0;
    desplazarImagen();
});

btnBack.addEventListener('click' , () => {

    index --;
    if(index < 0) index = imagenesDelSlide.length - 1;
    desplazarImagen();
});

setInterval(() => {
  index++;
  if (index >= imagenesDelSlide.length) index = 0;
  desplazarImagen();
}, 5000);


// CREAR TARJETAS DE CURSOS EN INICIO
const contenedorCursos = document.querySelector('.cursos__cards');
const tarjetas = new TarjetaCurso();
tarjetas.renderizarTarjetas(contenedorCursos);
