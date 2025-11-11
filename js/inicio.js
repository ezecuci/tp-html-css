const datosSesion = JSON.parse(sessionStorage.getItem('sesionActiva'));
const contenedorLogin = document.querySelector('.login');

if (datosSesion) {
  const links = contenedorLogin.querySelector('.login__links');
  if (links) {
    links.style.display = 'none';
  }

  const icono = contenedorLogin.querySelector('a');
  if (icono) {
    icono.removeAttribute('href');
  }

  const infoUsuario = document.createElement('div');
  infoUsuario.classList.add('login__usuario');

  infoUsuario.innerHTML = `
    <a href="./perfil-usuario.html" class="login__perfil-link">mi perfil</a>
    <button class="login__logout" type="button">cerrar sesión</button>
  `;

  contenedorLogin.appendChild(infoUsuario);
  const btnLogout = infoUsuario.querySelector('.login__logout');
  btnLogout.addEventListener('click', function () {
    sessionStorage.removeItem('sesionActiva');
    window.location.reload();
  });
}

const iconoLogin = document.querySelector('.login img');
const enlaceLogin = document.querySelector('.login a');

if (datosSesion && iconoLogin && enlaceLogin) {
  iconoLogin.src = './images/perfil-logeado.png';
  iconoLogin.alt = 'icono de perfil';
  enlaceLogin.href = './perfil-usuario.html';
}

import { RenderizadorDeCursos } from './renderizadorDeCursos.js';
import { CarritoModal } from './carritoModal.js';

const carritoModal = new CarritoModal();

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
const tarjetas = new RenderizadorDeCursos();
tarjetas.renderizarTarjetas(contenedorCursos);


//BTN AGREGAR AL CARRITO

const btnAgregar = document.querySelectorAll('.btn--agregar');

btnAgregar.forEach((btn, indice) => {
    btn.addEventListener('click', () => {
        carritoModal.agregarCurso(indice);
    });
});


