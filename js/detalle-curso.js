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

function marcarEstadoInscripcionDetalle(idCursoActual) {
  const comprados = obtenerCursosComprados();
  if (!idCursoActual || !comprados.has(idCursoActual)) return;

  const btnPrincipal = document.querySelector('.btn-primario');

  if (btnPrincipal) {
    const adquirido = document.createElement('span');
    adquirido.textContent = 'INSCRIPTO';
    adquirido.className = 'inscripto';
    btnPrincipal.replaceWith(adquirido);
  }  
}
var cursoActualId = null;

function obtenerIdDeURL() {
  var p = new URLSearchParams(window.location.search);
  return p.get('id');
}

function generarEstrellas(n) {
  var html = '';
  for (var i = 0; i < 5; i++) {
    if (i < n) { html += '<span class="star">★</span>'; }
    else { html += '<span class="star off">★</span>'; }
  }
  return html;
}

function mostrarDatosCurso(curso) {
  document.title = curso.titulo + ' - cheCode';
  var img = document.querySelector('.info-curso_img img');
  if (img) {
    img.src = curso.imagen;
    img.alt = 'Imagen del curso ' + curso.titulo;
  }
  var h1 = document.querySelector('.info-curso_datos h1');
  if (h1) h1.textContent = curso.titulo;
  var lista = document.querySelector('.info-curso_especificaciones');
  if (lista) {
    var texto = '';
    texto += '<li><strong>Valor:</strong> ' + curso.valor + '</li>';
    texto += '<li><strong>Tiempo de dedicación necesario:</strong> ' + curso.duracion + '</li>';
    texto += '<li><strong>Descripción del curso:</strong> ' + curso.descripcion + '</li>';
    texto += '<li><strong>Requisitos Previos:</strong> ' + curso.requisitos + '</li>';
    lista.innerHTML = texto;
  }
}

function mostrarDocente(curso) {
  var foto = document.querySelector('.docente_foto img');
  var nombre = document.querySelector('.docente_nombre');
  var estrellas = document.querySelector('.docente_estrellas');
  var bio = document.querySelector('.docente_bio');
  if (foto) {
    foto.src = curso.docente.foto;
    foto.alt = 'Foto del docente ' + curso.docente.nombre;
  }
  if (nombre) nombre.textContent = curso.docente.nombre;
  if (estrellas) estrellas.innerHTML = generarEstrellas(curso.docente.estrellas);
  if (bio) bio.textContent = curso.docente.bio;
}

function mostrarModulos(curso) {
  var cont = document.getElementById('curso-modulos');
  if (!cont) return;
  cont.innerHTML = '';
  for (var i = 0; i < curso.modulos.length; i++) {
    var modulo = curso.modulos[i];
    var details = document.createElement('details');
    details.className = 'modulo';
    var summary = document.createElement('summary');
    summary.textContent = modulo.titulo;
    details.appendChild(summary);
    var caja = document.createElement('div');
    caja.className = 'caja-modulo';
    var ul = document.createElement('ul');
    ul.className = 'clases';
    for (var j = 0; j < modulo.clases.length; j++) {
      var clase = modulo.clases[j];
      var li = document.createElement('li');
      li.className = 'clase';
      var pT = document.createElement('p');
      pT.className = 'titulo';
      pT.textContent = clase.titulo;
      var pE = document.createElement('p');
      pE.className = 'estado_pendiente';
      pE.textContent = 'Pendiente';
      var pD = document.createElement('p');
      pD.className = 'duracion';
      pD.textContent = clase.duracion;
      li.appendChild(pT);
      li.appendChild(pE);
      li.appendChild(pD);
      ul.appendChild(li);
    }

    caja.appendChild(ul);
    details.appendChild(caja);
    cont.appendChild(details);
  }
}

function crearTarjeta(idCurso, data) {
  var card = document.createElement('div');
  card.className = 'card-curso rec-item';
  card.setAttribute('data-id', idCurso);

  var fotoPrecio = document.createElement('div');
  fotoPrecio.className = 'foto-precio';

  var img = document.createElement('img');
  img.src = data.imagen;
  img.alt = data.titulo;
  fotoPrecio.appendChild(img);

  var precio = document.createElement('span');
  precio.className = 'precio';
  precio.textContent = data.valor;
  fotoPrecio.appendChild(precio);

  var pie = document.createElement('div');
  pie.className = 'pie-card';

  var horas = document.createElement('p');
  horas.className = 'horas';
  horas.innerHTML = '<strong>' + data.duracion + '</strong>';

  var lado = document.createElement('div');
  lado.className = 'lado-derecho';

  var titulo = document.createElement('p');
  titulo.className = 'titulo-curso';
  titulo.textContent = data.titulo;

  var ver = document.createElement('button');
  ver.className = 'ver-detalle';
  ver.type = 'button';
  ver.textContent = 'Ver Detalle';

  var comprar = document.createElement('button');
  comprar.className = 'btn-comprar';
  comprar.type = 'button';
  comprar.textContent = 'Comprar';

  lado.appendChild(titulo);
  lado.appendChild(ver);
  lado.appendChild(comprar);

  pie.appendChild(horas);
  pie.appendChild(lado);

  card.appendChild(fotoPrecio);
  card.appendChild(pie);

  ver.addEventListener('click', function () {
    cargarCurso(idCurso);
  });

  img.addEventListener('click', function () {
    cargarCurso(idCurso);
  });

  return card;
}

function mostrarRecomendados(idActual) {
  var lista = document.getElementById('rec-lista');
  if (!lista) return;
  lista.innerHTML = '';
  var comprados = obtenerCursosComprados();
  var ids = [];
  for (var id in CURSOS) {
    if (id === idActual) continue;
    if (comprados.has(id)) continue;
    ids.push(id);
  }

  if (!ids.length) return;

  var agregados = 0;
  var idx = 0;
  while (agregados < 4 && idx < ids.length) {
    var id = ids[idx];
    var data = CURSOS[id];
    if (data) {
      var card = crearTarjeta(id, data);
      lista.appendChild(card);
      agregados++;
    }
    idx++;
  }
}

function cargarCurso(id) {
  var curso = CURSOS[id];
  if (!curso) return;

  cursoActualId = id;
  mostrarDatosCurso(curso);
  mostrarDocente(curso);
  mostrarModulos(curso);
  mostrarRecomendados(id);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function obtenerSesion() {
  try { return JSON.parse(sessionStorage.getItem('sesionActiva') || 'null'); }
  catch { return null; }
}

function esCuentaEmpresa(sesion) {
  return sesion && sesion.nombreEmpresa;
}

function obtenerIndiceCursoPorId(idBuscado) {
  const cursos = [];
  let indice = 0;
  for (let id in CURSOS) {
    const curso = CURSOS[id];
    cursos.push({ id, indice });
    indice++;
  }
  const encontrado = cursos.find(c => c.id === idBuscado);
  return encontrado ? String(encontrado.indice) : null;
}

function agregarAlCarrito(indice) {
  const carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
  const existe = carrito.some(i => String(i) === String(indice));
  if (existe) {
    if (window.carritoModal) {
      carritoModal.mostrarModal();
    }
    return;
  }

  carrito.push(indice);
  sessionStorage.setItem('carrito', JSON.stringify(carrito));

  if (window.carritoModal) {
    carritoModal.cursosAgregados = carrito;
    carritoModal.actualizarContador();
    carritoModal.mostrarModal();
  }
}

const botonInscribirse = document.querySelector('.btn-primario');
if (botonInscribirse) {
  botonInscribirse.addEventListener('click', function (e) {
    const sesion = obtenerSesion();
    const idCurso = window.cursoActualId || new URLSearchParams(location.search).get('id');
    const indice = obtenerIndiceCursoPorId(idCurso);

    if (esCuentaEmpresa(sesion)) {
      window.location.href = './form-empresas.html?id=';
      return;
    }

    agregarAlCarrito(indice);
  });
}

document.addEventListener('click', function (e) {
  const btn = e.target.closest('.btn-comprar');
  if (!btn) return;

  const sesion = obtenerSesion();
  const card = btn.closest('.rec-item');
  const idCurso = card ? card.getAttribute('data-id') : null;
  const indice = obtenerIndiceCursoPorId(idCurso);

  if (esCuentaEmpresa(sesion)) {
    window.location.href = './form-empresas.html?id=';
    return;
  }

  agregarAlCarrito(indice);
});


document.addEventListener('DOMContentLoaded', function () {
  if (typeof CURSOS === 'undefined') {
    console.error('Primero cargá cursosData.js');
    return;
  }

  var id = obtenerIdDeURL();

  cargarCurso(id);
  marcarEstadoInscripcionDetalle(id);   
});