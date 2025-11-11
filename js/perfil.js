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

const sesion = JSON.parse(sessionStorage.getItem('sesionActiva'));
const nombreTitulo = document.querySelector('.datos-perfil h1');
const subtitulo = document.querySelector('.datos-perfil p:first-of-type');
const emailTexto = document.querySelector('.datos-perfil p:nth-of-type(2)');
if (sesion.tipo === 'personal') {
  nombreTitulo.textContent = `${sesion.nombre.toUpperCase()} ${sesion.apellido.toUpperCase()}`;
  subtitulo.textContent = 'Cuenta personal - Estudiante de cheCode';
  emailTexto.textContent = sesion.email;
} else if (sesion.tipo === 'empresa') {
  nombreTitulo.textContent = sesion.nombreEmpresa.toUpperCase();
  subtitulo.textContent = 'Cuenta empresarial - Socio de cheCode';
  emailTexto.textContent = sesion.email;
}