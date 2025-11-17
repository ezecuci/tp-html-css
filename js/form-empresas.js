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
  

  function renumerar() {
  var form = document.querySelector('.empleados__inscripcion-formulario');
  if (!form) return;

  var sets = form.querySelectorAll('fieldset');

  for (var i = 0; i < sets.length; i++) {
    var numero = i + 1;
    var fs = sets[i];

    var titulo = fs.querySelector('legend');
    if (titulo) {
      titulo.textContent = 'Cursante ' + numero;
    }

    var inputs = fs.querySelectorAll('input');
    for (var j = 0; j < inputs.length; j++) {
      var input = inputs[j];
      if (!input.name) continue;

      var base = input.name.replace(/[0-9]/g, '');
      input.name = base + numero;
      input.id = base + numero;
    }
  }
}

  
  
  function vincularBotones(fs) {
    if (!fs) return;
  
    var btnMas = fs.querySelector('button[aria-label="Agregar cursante"]');
    var btnMenos = fs.querySelector('button[aria-label="Eliminar cursante"]');
    var form = document.querySelector('.empleados__inscripcion-formulario');
    if (!form) return;
  
    if (btnMas) {
      btnMas.onclick = function () {
        var primero = form.querySelector('fieldset');
        if (!primero) return;
  
        var nuevo = primero.cloneNode(true);
  
        var ins = nuevo.querySelectorAll('input');
        for (var i = 0; i < ins.length; i++) {
          ins[i].value = '';
        }
  
        var submit = form.querySelector('button[type="submit"]');
        form.insertBefore(nuevo, submit);
  
        renumerar();
        vincularBotones(nuevo);
      };
    }
  
    if (btnMenos) {
      btnMenos.onclick = function () {
        var todos = form.querySelectorAll('fieldset');
        if (todos.length <= 1) {
          return;
        }
  
        fs.remove();
        renumerar();
      };
    }
  }
  

  (function init() {
    
    var fs0 = document.querySelector('.empleados__inscripcion-formulario fieldset');
    if (fs0) {
      vincularBotones(fs0);
    }
  
    renumerar();
  })();
  
  