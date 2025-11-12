const datosSesion = JSON.parse(sessionStorage.getItem('sesionActiva'));
const contenedorLogin = document.querySelector('.login');

import { CarritoModal } from './carritoModal.js';
const carritoModal = new CarritoModal();

if (datosSesion) {
  const links = contenedorLogin.querySelector('.login__links');
  if (links) links.style.display = 'none';
  const a = contenedorLogin.querySelector('a');
  if (a) a.removeAttribute('href');

  const info = document.createElement('div');
  info.className = 'login__usuario';
  info.innerHTML = `
    <a href="./perfil-usuario.html" class="login__perfil-link">mi perfil</a>
    <button class="login__logout" type="button">cerrar sesión</button>
  `;
  contenedorLogin.appendChild(info);
  info.querySelector('.login__logout').addEventListener('click', () => {
    sessionStorage.removeItem('sesionActiva'); window.location.href = './index.html';
  });
}
const iconoLogin = document.querySelector('.login img');
const enlaceLogin = document.querySelector('.login a');
if (datosSesion && iconoLogin && enlaceLogin) {
  iconoLogin.src = './images/perfil-logeado.png';
  iconoLogin.alt = 'icono de perfil';
  enlaceLogin.href = './perfil-usuario.html';
}

const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const diasSemana = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];

let hoy = new Date();
let mesActual = hoy.getMonth();
let anioActual = hoy.getFullYear();

const diasSemanaEl   = document.getElementById('diasSemana');
const contenedorDias = document.getElementById('contenedorDias');

let control = document.getElementById('calendar_control_container');
if (!control) {
  control = document.createElement('div');
  control.id = 'calendar_control_container';
  control.className = 'contenedorMes';
  control.innerHTML = `
    <button id="calendar_prev">◀</button>
    <h2 id="calendar_titulo" class="tituloMes"></h2>
    <button id="calendar_next">▶</button>
  `;
  contenedorDias.parentNode.insertBefore(control, contenedorDias);
}
const tituloMesEl = document.getElementById('calendar_titulo');
const btnPrev = document.getElementById('calendar_prev');
const btnNext = document.getElementById('calendar_next');

const cursosPorFecha = {
  "2025-11-12": "pentesting",
  "2025-11-15": "node-react",
  "2025-11-20": "backend"
};

function pintarCabecera() {
  diasSemanaEl.innerHTML = '';
  for (let i = 0; i < diasSemana.length; i++) {
    const d = document.createElement('div');
    d.className = 'dia-semana';
    d.textContent = diasSemana[i];
    diasSemanaEl.appendChild(d);
  }
}

function pintarCalendario(mes, anio) {
  contenedorDias.innerHTML = '';
  tituloMesEl.textContent = `${meses[mes]} ${anio}`;

  const primero = new Date(anio, mes, 1);
  const ultimo  = new Date(anio, mes + 1, 0);
  const huecosInicio = primero.getDay();
  const totalDias = ultimo.getDate();

  for (let i = 0; i < huecosInicio; i++) {
    const v = document.createElement('div');
    v.className = 'espacioCurso dia-semana';
    contenedorDias.appendChild(v);
  }

  for (let dia = 1; dia <= totalDias; dia++) {
    const celda = document.createElement('div');
    celda.className = 'espacioCurso dia-fecha';

    const h2 = document.createElement('h2');
    const spanNum = document.createElement('span');
    spanNum.className = 'numeroDia';
    spanNum.textContent = dia;
    h2.appendChild(spanNum);
    celda.appendChild(h2);

    const fechaClave = `${anio}-${String(mes + 1).padStart(2,'0')}-${String(dia).padStart(2,'0')}`;
    const idCurso = cursosPorFecha[fechaClave];

    if (idCurso && window.CURSOS && window.CURSOS[idCurso]) {
      const curso = window.CURSOS[idCurso];
      const link = document.createElement('a');
      link.href = '#';
      link.className = 'pruebaHoover';
      link.textContent = curso.titulo;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarPopupCurso(idCurso);
      });
      celda.appendChild(link);
    }

    contenedorDias.appendChild(celda);
  }
}

function mostrarPopupCurso(idCurso) {
  const curso = window.CURSOS[idCurso];
  if (!curso) return;

  const overlay = document.createElement('div');
  overlay.className = 'popup-overlay';
  overlay.innerHTML = `
    <div class="popup">
      <button class="popup-cerrar">✖</button>
      <img src="${curso.imagen}" alt="${curso.titulo}">
      <h2>${curso.titulo}</h2>
      <p class="popup-descripcion">${curso.descripcion}</p>
      <p><strong>Duración:</strong> ${curso.duracion}</p>
      <p><strong>Valor:</strong> ${curso.valor}</p>
      <a href="./detalle-curso.html?id=${idCurso}" class="popup-boton">Ver detalle</a>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector('.popup-cerrar').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

btnPrev.addEventListener('click', () => {
  mesActual--; if (mesActual < 0) { mesActual = 11; anioActual--; }
  pintarCalendario(mesActual, anioActual);
});
btnNext.addEventListener('click', () => {
  mesActual++; if (mesActual > 11) { mesActual = 0; anioActual++; }
  pintarCalendario(mesActual, anioActual);
});

pintarCabecera();
pintarCalendario(mesActual, anioActual);