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

function obtenerCursosComprados() {
  const sesion = JSON.parse(sessionStorage.getItem('sesionActiva') || 'null');
  if (!sesion || !sesion.email) return new Set();
  const key = 'mis_cursos:' + sesion.email;
  const ids = JSON.parse(localStorage.getItem(key) || '[]');
  return new Set(ids);
}

function extraerIdDesdeHref(href) {
  try {
    const u = new URL(href, location.origin);
    return u.searchParams.get('id');
  } catch { return null; }
}

function marcarAdquiridosEnListado(contenedor) {
  const comprados = obtenerCursosComprados();
  if (!contenedor || !comprados.size) return;

  contenedor.querySelectorAll('li.card').forEach(card => {
    const link = card.querySelector('a[href*="detalle-curso.html"]');
    const id = link ? extraerIdDesdeHref(link.href) : null;
    if (!id || !comprados.has(id)) return;

    const btn = card.querySelector('.btn--agregar');
    if (btn) {
      const adquirido = document.createElement('span');
      adquirido.textContent = 'Adquirido';
      adquirido.className = 'adquirido';
      btn.replaceWith(adquirido);
    }
  });
}

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

const contenedorCursos = document.querySelector('.cursos__cards');
const tarjetas = new RenderizadorDeCursos();

tarjetas.renderizarTarjetas(contenedorCursos);

marcarAdquiridosEnListado(contenedorCursos);

const btnAgregar = contenedorCursos.querySelectorAll('.btn--agregar');
btnAgregar.forEach((btn, indice) => {
  btn.addEventListener('click', () => {
    carritoModal.agregarCurso(indice);
  });
});