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

const form      = document.querySelector('.pago__formulario');
const numInput  = document.getElementById('numero-tarjeta');
const vencInput = document.getElementById('vencimiento');
const cvcInput  = document.getElementById('codigo');
const nameInput = document.getElementById('titular');
const btnPagar  = document.querySelector('.pago__boton');

function textoANumero(texto) {
  let limpio = '';
  for (let i = 0; i < texto.length; i++) {
    const ch = texto[i];
    if ((ch >= '0' && ch <= '9') || ch === '.') limpio += ch;
  }
  return limpio === '' ? 0 : parseFloat(limpio);
}
function formatearPrecio(n) { return `$${n} USD`; }

function mostrarError(msj) {
  let p = form.querySelector('.pago__mensaje');
  if (!p) {
    p = document.createElement('p');
    p.className = 'mensaje--error pago__mensaje';
    btnPagar.insertAdjacentElement('beforebegin', p);
  }
  p.textContent = msj;
}
function limpiarError() {
  const p = form.querySelector('.pago__mensaje');
  if (p) p.textContent = '';
}

function construirListaCursosMin() {
  const lista = [];
  if (!window.CURSOS) return lista;
  for (let id in window.CURSOS) {
    const c = window.CURSOS[id];
    lista.push({
      idCurso: id,
      precioNumero: textoANumero(typeof c.valor === 'string' ? c.valor : String(c.valor))
    });
  }
  return lista;
}

function calcularTotal() {
  const indices = JSON.parse(sessionStorage.getItem('carrito') || '[]');
  const codigo  = sessionStorage.getItem('carrito_codigo') || null;
  const cursos  = construirListaCursosMin();

  let subtotal = 0;
  for (let i = 0; i < indices.length; i++) {
    const idx = indices[i];
    const curso = cursos[idx];
    if (curso && typeof curso.precioNumero === 'number') subtotal += curso.precioNumero;
  }

  let descuento = 0;
  if (indices.length > 0 && codigo === 'checode20') descuento = subtotal * 0.2;

  let total = subtotal - descuento;
  if (total < 0) total = 0;

  return { cantidad: indices.length, subtotal, descuento, total };
}

function actualizarBotonTotal() {
  const tot = calcularTotal();
  if (btnPagar) btnPagar.textContent = 'Pagar ' + formatearPrecio(tot.total);
}

if (numInput) {
  numInput.addEventListener('input', () => {
    let solo = numInput.value.replace(/\D/g, '').slice(0, 16);
    numInput.value = solo.replace(/(.{4})/g, '$1 ').trim();
  });
}
if (vencInput) {
  vencInput.addEventListener('input', () => {
    let solo = '';
    for (let i = 0; i < vencInput.value.length; i++) {
      const ch = vencInput.value[i];
      if (ch >= '0' && ch <= '9') solo += ch;
    }
    if (solo.length > 4) solo = solo.slice(0, 4);
    if (solo.length === 4) vencInput.value = solo.slice(0, 2) + '/' + solo.slice(2);
    else vencInput.value = solo;
  });
}

function tarjetaOk() {
  const solo = numInput.value.replace(/\D/g, '');
  return solo.length === 16;
}
function vencimientoOk() {
  const s = (vencInput.value || '').trim();
  if (s.length !== 5) return false;
  if (s[2] !== '/') return false;

  const m0 = s[0], m1 = s[1], y0 = s[3], y1 = s[4];
  if (m0 < '0' || m0 > '9') return false;
  if (m1 < '0' || m1 > '9') return false;
  if (y0 < '0' || y0 > '9') return false;
  if (y1 < '0' || y1 > '9') return false;

  let mesValido = false;
  if (m0 === '0' && m1 >= '1' && m1 <= '9') mesValido = true;
  if (m0 === '1' && (m1 === '0' || m1 === '1' || m1 === '2')) mesValido = true;
  if (!mesValido) return false;

  const a = (y0.charCodeAt(0) - 48) * 10 + (y1.charCodeAt(0) - 48);
  if (a < 25 || a > 35) return false;

  return true;
}
function cvcOk() {
  const solo = cvcInput.value.replace(/\D/g, '');
  return solo.length === 3;
}
function titularOk() {
  const s = (nameInput.value || '').trim();
  return s.length >= 2;
}

function guardarCompraYRedirigir() {
  const sesionObj = JSON.parse(sessionStorage.getItem('sesionActiva') || 'null');
  if (!sesionObj || !sesionObj.email) return;

  const emailKey = sesionObj.email;
  const indices  = JSON.parse(sessionStorage.getItem('carrito') || '[]');
  const cursos   = construirListaCursosMin();

  const storageKey = 'mis_cursos:' + emailKey;
  const actuales   = JSON.parse(localStorage.getItem(storageKey) || '[]'); // array de IDs

  for (let i = 0; i < indices.length; i++) {
    const idx = indices[i];
    const curso = cursos[idx];
    if (!curso) continue;
    const idCurso = curso.idCurso;
    if (actuales.indexOf(idCurso) === -1) actuales.push(idCurso);
  }

  localStorage.setItem(storageKey, JSON.stringify(actuales));
  sessionStorage.setItem('compra_ok', '1');

  sessionStorage.removeItem('carrito');
  sessionStorage.removeItem('carrito_codigo');
  sessionStorage.removeItem('carrito_mensaje');

  window.location.href = './perfil-usuario.html';
}

(function init() { actualizarBotonTotal(); })();

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    limpiarError();

    const sesion = sessionStorage.getItem('sesionActiva');
    if (!sesion) { mostrarError('Iniciá sesión para procesar el pago.'); return; }

    const tot = calcularTotal();
    if (tot.cantidad === 0) {
      mostrarError('Tu carrito está vacío.');
      actualizarBotonTotal();
      return;
    }

    if (!tarjetaOk())   { mostrarError('Número de tarjeta inválido (16 dígitos).'); numInput.focus();  return; }
    if (!vencimientoOk()){ mostrarError('Vencimiento inválido (MM/AA: mes 01–12 y año 25–35).'); vencInput.focus(); return; }
    if (!cvcOk())       { mostrarError('CVC inválido (3 dígitos).'); cvcInput.focus(); return; }
    if (!titularOk())   { mostrarError('Ingresá el titular de la tarjeta.'); nameInput.focus(); return; }

    guardarCompraYRedirigir();
  });
}
