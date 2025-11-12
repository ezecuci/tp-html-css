const datosSesion = JSON.parse(sessionStorage.getItem('sesionActiva'));
const contenedorLogin = document.querySelector('.login');

if (datosSesion) {
  const links = contenedorLogin.querySelector('.login__links');
  if (links) links.style.display = 'none';
  const icono = contenedorLogin.querySelector('a');
  if (icono) icono.removeAttribute('href');

  const infoUsuario = document.createElement('div');
  infoUsuario.classList.add('login__usuario');
  infoUsuario.innerHTML = `
    <a href="./perfil-usuario.html" class="login__perfil-link">mi perfil</a>
    <button class="login__logout" type="button">cerrar sesión</button>
  `;
  contenedorLogin.appendChild(infoUsuario);
  const btnLogout = infoUsuario.querySelector('.login__logout');
  btnLogout.addEventListener('click', () => {
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



const meses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

let fechaActual = new Date();
let mesActual = fechaActual.getMonth();
let anioActual = fechaActual.getFullYear();

const primerCalendario = document.querySelector('.calendario');


let contenedorMes = document.getElementById('calendar_control_container');
if (!contenedorMes) {
  contenedorMes = document.createElement('div');
  contenedorMes.id = 'calendar_control_container';
  contenedorMes.className = 'contenedorMes';

  const btnPrev = document.createElement('button');
  btnPrev.id = 'calendar_prev';
  btnPrev.textContent = '◀';

  const titulo = document.createElement('h2');
  titulo.id = 'calendar_control_titulo';
  titulo.className = 'tituloMes';

  const btnNext = document.createElement('button');
  btnNext.id = 'calendar_next';
  btnNext.textContent = '▶';

  contenedorMes.append(btnPrev, titulo, btnNext);
  primerCalendario.parentNode.insertBefore(contenedorMes, primerCalendario);


  const frase = document.createElement('h4');
  frase.textContent = '¡Explorá el cronograma disponible!';
  frase.classList.add('frase-calendario');
  primerCalendario.parentNode.insertBefore(frase, primerCalendario);
}

let diasSemanaDiv = document.getElementById('calendar_diasSemana');
if (!diasSemanaDiv) {
  diasSemanaDiv = document.createElement('div');
  diasSemanaDiv.id = 'calendar_diasSemana';
  diasSemanaDiv.className = 'dias-semana calendario';
  primerCalendario.parentNode.insertBefore(diasSemanaDiv, primerCalendario);
}

let contenedorDias = document.getElementById('calendar_contenedorDias');
if (!contenedorDias) {
  contenedorDias = document.createElement('div');
  contenedorDias.id = 'calendar_contenedorDias';
  contenedorDias.className = 'calendario';
  primerCalendario.parentNode.insertBefore(contenedorDias, primerCalendario.nextSibling);
}


const cursosPorFecha = {
  "2025-11-12": "pentesting",
  "2025-11-15": "node-react",
  "2025-11-20": "backend"
};

const tituloMesControl = document.getElementById('calendar_control_titulo');
const btnPrevControl = document.getElementById('calendar_prev');
const btnNextControl = document.getElementById('calendar_next');


function mostrarDiasSemana() {
  diasSemanaDiv.innerHTML = '';
  for (const dia of diasSemana) {
    const el = document.createElement('div');
    el.className = 'dia-semana';
    el.textContent = dia;
    diasSemanaDiv.appendChild(el);
  }
}


function mostrarCalendario(mes, anio) {
  contenedorDias.innerHTML = '';
  const primerDia = new Date(anio, mes, 1);
  const ultimoDia = new Date(anio, mes + 1, 0);
  const primerDiaSemana = primerDia.getDay();
  const totalDias = ultimoDia.getDate();
  tituloMesControl.textContent = `${meses[mes]} ${anio}`;


  for (let i = 0; i < primerDiaSemana; i++) {
    const vacio = document.createElement('div');
    vacio.className = 'espacioCurso dia-semana';
    contenedorDias.appendChild(vacio);
  }


  for (let dia = 1; dia <= totalDias; dia++) {
    const celda = document.createElement('div');
    celda.className = 'espacioCurso dia-fecha';

    const titulo = document.createElement('h2');
    const span = document.createElement('span');
    span.className = 'numeroDia';
    span.textContent = dia;
    titulo.appendChild(span);
    celda.appendChild(titulo);

    const fechaClave = `${anio}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    const cursoId = cursosPorFecha[fechaClave];

    if (cursoId && window.CURSOS[cursoId]) {
      const curso = window.CURSOS[cursoId];
      const enlace = document.createElement('a');
      enlace.href = '#';
      enlace.className = 'pruebaHoover';
      enlace.textContent = curso.titulo;
      enlace.addEventListener('click', e => {
        e.preventDefault();
        mostrarPopupCurso(curso);
      });
      celda.appendChild(enlace);
    }

    contenedorDias.appendChild(celda);
  }
}


function mostrarPopupCurso(curso) {
  const popup = document.createElement('div');
  popup.classList.add('popup-overlay');
  popup.innerHTML = `
    <div class="popup">
      <button class="popup-cerrar">✖</button>
      <img src="${curso.imagen}" alt="${curso.titulo}">
      <h2>${curso.titulo}</h2>
      <p class="popup-descripcion">${curso.descripcion}</p>
      <p><strong>Duración:</strong> ${curso.duracion}</p>
      <p><strong>Valor:</strong> ${curso.valor}</p>
      <a href="./detalle-curso.html" class="popup-boton">Ver detalle</a>
    </div>
  `;
  document.body.appendChild(popup);

  const cerrar = popup.querySelector('.popup-cerrar');
  cerrar.addEventListener('click', () => popup.remove());
  popup.addEventListener('click', e => {
    if (e.target === popup) popup.remove();
  });
}


btnPrevControl.addEventListener('click', () => {
  mesActual--;
  if (mesActual < 0) {
    mesActual = 11;
    anioActual--;
  }
  mostrarCalendario(mesActual, anioActual);
});
btnNextControl.addEventListener('click', () => {
  mesActual++;
  if (mesActual > 11) {
    mesActual = 0;
    anioActual++;
  }
  mostrarCalendario(mesActual, anioActual);
});


mostrarDiasSemana();
mostrarCalendario(mesActual, anioActual);
