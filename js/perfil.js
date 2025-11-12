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

(function () {
  const sesion = JSON.parse(sessionStorage.getItem('sesionActiva') || 'null');
  const h1 = document.querySelector('.datos-perfil h1');
  const subt = document.querySelector('.datos-perfil p:first-of-type');
  const mail = document.querySelector('.datos-perfil p:nth-of-type(2)');

  if (sesion.tipo === 'personal') {
    if (h1) h1.textContent = (sesion.nombre + ' ' + sesion.apellido).toUpperCase();
    if (subt) subt.textContent = 'Cuenta personal - Estudiante de cheCode';
    if (mail) mail.textContent = sesion.email;
  } else {
    if (h1) h1.textContent = (sesion.nombreEmpresa || '').toUpperCase();
    if (subt) subt.textContent = 'Cuenta empresarial - Socio de cheCode';
    if (mail) mail.textContent = sesion.email;
  }
})();

function extraerHoras(duracionStr) {
  let nums = '';
  const s = duracionStr || '';
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch >= '0' && ch <= '9') nums += ch;
  }
  return nums || '0';
}

function crearCardPerfil(id, data) {
  const card = document.createElement('div');
  card.className = 'card-curso rec-item';
  card.setAttribute('data-id', id);

  const fotoPrecio = document.createElement('div');
  fotoPrecio.className = 'foto-precio';

  const img = document.createElement('img');
  img.src = data.imagen;
  img.alt = data.titulo;
  fotoPrecio.appendChild(img);

  const pie = document.createElement('div');
  pie.className = 'pie-card';

  const horas = document.createElement('p');
  horas.className = 'horas';
  horas.innerHTML = '<strong>' + extraerHoras(data.duracion) + '</strong><span>hs</span>';

  const lado = document.createElement('div');
  lado.className = 'lado-derecho';

  const titulo = document.createElement('p');
  titulo.className = 'titulo-curso';
  titulo.textContent = data.titulo;

  const ver = document.createElement('a');
  ver.className = 'ver-detalle';
  ver.href = './detalle-curso.html?id=' + encodeURIComponent(id);
  ver.textContent = 'Ver Detalle';

  lado.appendChild(titulo);
  lado.appendChild(ver);
  pie.appendChild(horas);
  pie.appendChild(lado);
  card.appendChild(fotoPrecio);
  card.appendChild(pie);
  return card;
}

(function () {
  const cont = document.querySelector('.lista-cursos');
  if (!cont) return;

  cont.innerHTML = '';

  const ok = sessionStorage.getItem('compra_ok');
  if (ok) {
    const p = document.createElement('p');
    p.className = 'mensaje--ok';
    p.textContent = '¡Compra realizada con éxito!';
    cont.parentElement.insertBefore(p, cont);
    sessionStorage.removeItem('compra_ok');
  }

  const sesion = JSON.parse(sessionStorage.getItem('sesionActiva') || 'null');
  if (!sesion || !sesion.email) {
    cont.innerHTML = '<p class="sin-cursos">No hay cursos disponibles</p>';
    return;
  }

  const key = 'mis_cursos:' + sesion.email;
  const ids = JSON.parse(localStorage.getItem(key) || '[]');

  if (!ids || !ids.length) {
    cont.innerHTML = '<p class="sin-cursos">No hay cursos disponibles</p>';
    return;
  }

  if (!window.CURSOS) {
    cont.innerHTML = '<p class="sin-cursos">No hay cursos disponibles</p>';
    console.error('CURSOS no está cargado. Asegurate de incluir cursosData.js antes de perfil.js');
    return;
  }

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const data = window.CURSOS[id];
    if (!data) continue;
    cont.appendChild(crearCardPerfil(id, data));
  }
})();