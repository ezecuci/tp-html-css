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
    window.location.href = './index.html'; 
  });
}

const iconoLogin = document.querySelector('.login img');
const enlaceLogin = document.querySelector('.login a');

if (datosSesion && iconoLogin && enlaceLogin) {
  iconoLogin.src = './images/perfil-logeado.png';
  iconoLogin.alt = 'icono de perfil';
  enlaceLogin.href = './perfil-usuario.html';
}

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

import { RenderizadorDeCursos } from "./renderizadorDeCursos.js";
import { CarritoModal } from "./carritoModal.js";

const carritoModal = new CarritoModal();

const contenedorCursos = document.querySelector('.cursos__cards--todas');
const tarjetas = new RenderizadorDeCursos();

tarjetas.renderizarTarjetas(contenedorCursos);

marcarAdquiridosEnListado(contenedorCursos);

contenedorCursos.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn--agregar');
  if (!btn || !contenedorCursos.contains(btn)) return;
  const idx = btn.getAttribute('data-index');
  if (idx == null || idx === '') return;
  carritoModal.agregarCurso(idx);
});
