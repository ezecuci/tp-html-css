import { Modal } from "./modal.js";

document.addEventListener('DOMContentLoaded', function () {
  var datosSesion = JSON.parse(sessionStorage.getItem('sesionActiva') || 'null');
  var contenedorLogin = document.querySelector('.login');
  var modal = new Modal();

  function mostrarMensaje(texto, elementoFoco) {
    if (elementoFoco) {
      modal.mostrarMensaje(texto, function () {
        elementoFoco.focus();
      });
    } else {
      modal.mostrarMensaje(texto);
    }
  }

  if (!datosSesion) {
    window.location.href = './inicio-sesion.html';
    return;
  }

  if (contenedorLogin) {
    var links = contenedorLogin.querySelector('.login__links');
    if (links) {
      links.style.display = 'none';
    }

    var icono = contenedorLogin.querySelector('a');
    if (icono) {
      icono.removeAttribute('href');
    }

    var infoUsuario = document.createElement('div');
    infoUsuario.classList.add('login__usuario');
    infoUsuario.innerHTML =
      '<a href="./perfil-usuario.html" class="login__perfil-link">mi perfil</a>' +
      '<button class="login__logout" type="button">cerrar sesión</button>';

    contenedorLogin.appendChild(infoUsuario);

    var btnLogout = infoUsuario.querySelector('.login__logout');
    btnLogout.addEventListener('click', function () {
      sessionStorage.removeItem('sesionActiva');
      window.location.href = './index.html';
    });
  }

  var titulo = document.querySelector('.editar-perfil__titulo');
  var textoTipo = document.querySelector('.editar-perfil__tipo-cuenta');

  var form = document.querySelector('.editar-perfil__form');
  if (!form) {
    return;
  }

  var filasPersonales = document.querySelectorAll('.editar-perfil__fila-personal');
  var filaEmpresa = document.querySelector('.editar-perfil__fila-empresa');

  var inputNombre = document.getElementById('editar-nombre');
  var inputApellido = document.getElementById('editar-apellido');
  var inputEmpresa = document.getElementById('editar-empresa');
  var inputEmail = document.getElementById('editar-email');
  var inputPassword = document.getElementById('editar-password');

  // Buscamos el usuario actual en localStorage
  var usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  var usuarioActual = null;

  for (var i = 0; i < usuarios.length; i++) {
    var u = usuarios[i];
    if (u.email === datosSesion.email && u.tipo === datosSesion.tipo) {
      usuarioActual = u;
      break;
    }
  }

  if (!usuarioActual) {
    mostrarMensaje('No se encontró el usuario en el almacenamiento local.');
    return;
  }

  // --- Rellenar datos según tipo de cuenta ---
  if (datosSesion.tipo === 'personal') {
    if (titulo) {
      var nombreCompleto =
        (datosSesion.nombre || '') + ' ' + (datosSesion.apellido || '');
      titulo.textContent = nombreCompleto.toUpperCase();
    }
    if (textoTipo) {
      textoTipo.textContent = 'Cuenta personal - Estudiante de cheCode';
    }

    if (inputNombre) {
      inputNombre.value = datosSesion.nombre || '';
    }
    if (inputApellido) {
      inputApellido.value = datosSesion.apellido || '';
    }

    if (filaEmpresa) {
      filaEmpresa.style.display = 'none';
    }
    for (var j = 0; j < filasPersonales.length; j++) {
      filasPersonales[j].style.display = 'flex';
    }
  } else if (datosSesion.tipo === 'empresa') {
    if (titulo) {
      titulo.textContent = (datosSesion.nombreEmpresa || '').toUpperCase();
    }
    if (textoTipo) {
      textoTipo.textContent = 'Cuenta empresarial - Socio de cheCode';
    }

    if (inputEmpresa) {
      inputEmpresa.value = datosSesion.nombreEmpresa || '';
    }

    if (filaEmpresa) {
      filaEmpresa.style.display = 'flex';
    }
    for (var k = 0; k < filasPersonales.length; k++) {
      filasPersonales[k].style.display = 'none';
    }
  }

  if (inputEmail) {
    inputEmail.value = datosSesion.email || '';
  }
  if (inputPassword) {
    inputPassword.value = usuarioActual.password || '';
  }

  // --- Guardar cambios ---
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var nuevoNombre = inputNombre ? inputNombre.value.trim() : '';
    var nuevoApellido = inputApellido ? inputApellido.value.trim() : '';
    var nuevaEmpresa = inputEmpresa ? inputEmpresa.value.trim() : '';
    var nuevoEmail = inputEmail ? inputEmail.value.trim().toLowerCase() : '';
    var nuevaPassword = inputPassword ? inputPassword.value : '';

    // No permitir campos vacíos (ni solo espacios)
    if (datosSesion.tipo === 'personal') {
      if (!nuevoNombre) {
        mostrarMensaje('Ingresá tu nombre.', inputNombre);
        return;
      }
      if (!nuevoApellido) {
        mostrarMensaje('Ingresá tu apellido.', inputApellido);
        return;
      }
    } else if (datosSesion.tipo === 'empresa') {
      if (!nuevaEmpresa) {
        mostrarMensaje('Ingresá el nombre de la empresa.', inputEmpresa);
        return;
      }
    }

    if (!nuevoEmail) {
      mostrarMensaje('Ingresá un correo válido.', inputEmail);
      return;
    }

    if (nuevoEmail.indexOf(' ') !== -1) {
      mostrarMensaje('El correo no puede contener espacios.', inputEmail);
      return;
    }

    if (!nuevaPassword.trim()) {
      mostrarMensaje('Ingresá una contraseña.', inputPassword);
      return;
    }

    // Verificar que el nuevo email no exista en otro usuario distinto
    var existeOtro = false;
    for (var i2 = 0; i2 < usuarios.length; i2++) {
      var u2 = usuarios[i2];
      if (
        u2.email === nuevoEmail &&
        (u2.email !== usuarioActual.email || u2.tipo !== usuarioActual.tipo)
      ) {
        existeOtro = true;
        break;
      }
    }

    if (existeOtro) {
      mostrarMensaje('Ya existe un usuario registrado con ese correo.', inputEmail);
      return;
    }

    var emailViejo = datosSesion.email;

    // Actualizar datos en el objeto usuarioActual
    usuarioActual.email = nuevoEmail;
    usuarioActual.password = nuevaPassword;

    if (datosSesion.tipo === 'personal') {
      usuarioActual.nombre = (nuevoNombre || '').toUpperCase();
      usuarioActual.apellido = (nuevoApellido || '').toUpperCase();
    } else if (datosSesion.tipo === 'empresa') {
      usuarioActual.nombreEmpresa = (nuevaEmpresa || '').toUpperCase();
    }

    // Guardar array de usuarios actualizado
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Actualizar la sesionActiva
    var nuevaSesion = {
      tipo: datosSesion.tipo,
      email: nuevoEmail
    };

    if (datosSesion.tipo === 'personal') {
      nuevaSesion.nombre = nuevoNombre;
      nuevaSesion.apellido = nuevoApellido;
    } else if (datosSesion.tipo === 'empresa') {
      nuevaSesion.nombreEmpresa = nuevaEmpresa;
    }

    sessionStorage.setItem('sesionActiva', JSON.stringify(nuevaSesion));

    // Si cambió el correo, mover los cursos comprados a la nueva clave
    if (nuevoEmail !== emailViejo) {
      var keyVieja = 'mis_cursos:' + emailViejo;
      var keyNueva = 'mis_cursos:' + nuevoEmail;
      var cursosGuardados = localStorage.getItem(keyVieja);

      if (cursosGuardados !== null) {
        localStorage.setItem(keyNueva, cursosGuardados);
        localStorage.removeItem(keyVieja);
      }
    }

    mostrarMensaje('Datos actualizados correctamente.');

    setTimeout(function () {
      window.location.href = './perfil-usuario.html';
    }, 1500);
  });
});

  