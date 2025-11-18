(function () {
  var datos = null;
  try {
    datos = JSON.parse(sessionStorage.getItem('sesionActiva') || 'null');
  } catch (e) {}

  var cont = document.querySelector('.login');
  if (!cont) return;

  if (datos) {
    var links = cont.querySelector('.login__links');
    if (links) {
      links.style.display = 'none';
    }

    var a = cont.querySelector('a');
    var img = cont.querySelector('img');

    if (img) {
      img.src = './images/perfil-logeado.png';
      img.alt = 'icono de perfil';
    }
    if (a) {
      a.href = './perfil-usuario.html';
    }

    if (!cont.querySelector('.login__usuario')) {
      var info = document.createElement('div');
      info.className = 'login__usuario';
      info.innerHTML =
        '<a href="./perfil-usuario.html" class="login__perfil-link">mi perfil</a>' +
        '<button class="login__logout" type="button">cerrar sesión</button>';

      cont.appendChild(info);

      var btnLogout = info.querySelector('.login__logout');
      if (btnLogout) {
        btnLogout.addEventListener('click', function () {
          sessionStorage.removeItem('sesionActiva');
          window.location.href = './index.html';
        });
      }
    }
  }
})();


function obtenerIdCursoDesdeURL() {
  var search = window.location.search || '';
  var params = new URLSearchParams(search);
  return params.get('id');
}

function cargarCursoSeleccionado() {
  if (typeof CURSOS === 'undefined') {
    return;
  }

  var idCurso = obtenerIdCursoDesdeURL();
  if (!idCurso) {
    return;
  }

  var curso = CURSOS[idCurso];
  if (!curso) {
    return;
  }

  var cont = document.getElementById('cursoSeleccionado');
  if (!cont) {
    return;
  }

  var img = cont.querySelector('.curso-imagen');
  if (img) {
    img.src = curso.imagen;
    img.alt = curso.titulo;
  }

  var titulo = cont.querySelector('.curso-titulo');
  if (titulo) {
    titulo.textContent = curso.titulo;
  }

  var precio = cont.querySelector('.curso-precio');
  if (precio) {
    precio.textContent = curso.valor + ' por empleado';
  }

  var btnDetalle = cont.querySelector('.detalle-curso');
  if (btnDetalle) {
    btnDetalle.addEventListener('click', function () {
      window.location.href = './detalle-curso.html?id=' + encodeURIComponent(idCurso);
    });
  }
}

var contadorCursantes = 1;

function agregarCursante() {
  var form = document.querySelector('.empleados__inscripcion-formulario');
  if (!form) return;

  contadorCursantes++;
  var numero = contadorCursantes;

  var fs = document.createElement('fieldset');
  fs.className = 'empleados__inscripcion-formulario-campos';

  var html = '';
  html += '<legend>Cursante ' + numero + '</legend>';

  html += '<label for="nombre' + numero + '">nombre</label>';
  html += '<input type="text" id="nombre' + numero + '" name="nombre' + numero + '" class="icono-usuario" autocomplete="off" required placeholder="Nombre">';

  html += '<label for="apellido' + numero + '">apellido</label>';
  html += '<input type="text" id="apellido' + numero + '" name="apellido' + numero + '" class="icono-usuario" autocomplete="off" required placeholder="Apellido">';

  html += '<label for="email' + numero + '">email</label>';
  html += '<input type="email" id="email' + numero + '" name="email' + numero + '" class="icono-mail" autocomplete="off" required placeholder="Email">';

  html += '<label for="tel' + numero + '">telefono</label>';
  html += '<input type="tel" id="tel' + numero + '" name="tel' + numero + '" class="icono-tel" autocomplete="off" required placeholder="Teléfono">';



  fs.innerHTML = html;

  var submit = form.querySelector('button[type="submit"]');
  form.insertBefore(fs, submit);
}

function eliminarCursante() {
  var form = document.querySelector('.empleados__inscripcion-formulario');
  if (!form) return;

  var sets = form.querySelectorAll('fieldset');
  if (sets.length <= 1) {
    return;
  }

  var ultimo = sets[sets.length - 1];
  form.removeChild(ultimo);
  contadorCursantes--;
}


document.addEventListener('DOMContentLoaded', function () {
  cargarCursoSeleccionado();

  var btnMas = document.getElementById('btn-mas');
  var btnMenos = document.getElementById('btn-menos');

  if (btnMas) {
    btnMas.addEventListener('click', agregarCursante);
  }
  if (btnMenos) {
    btnMenos.addEventListener('click', eliminarCursante);
  }
});