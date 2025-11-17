// ===============================
// 0) NAV: mostrar perfil / cerrar sesión
// ===============================
(function () {
    var datos = null;
    try { datos = JSON.parse(sessionStorage.getItem('sesionActiva') || 'null'); } catch(e) {}
    var cont = document.querySelector('.login');
    if (!cont) return;
  
    // Oculta links si hay sesión y cambia icono
    if (datos) {
      var links = cont.querySelector('.login__links');
      if (links) links.style.display = 'none';
  
      var a = cont.querySelector('a');
      var img = cont.querySelector('img');
      if (img) { img.src = './images/perfil-logeado.png'; img.alt = 'icono de perfil'; }
      if (a) a.href = './perfil-usuario.html';
  
      // Inyecta perfil / logout si no existe
      if (!cont.querySelector('.login__usuario')) {
        var info = document.createElement('div');
        info.className = 'login__usuario';
        info.innerHTML = '<a href="./perfil-usuario.html" class="login__perfil-link">mi perfil</a> <button class="login__logout" type="button">cerrar sesión</button>';
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
   
  // ===============================
  // 1) Utilidades simples
  // ===============================
  function getIdCurso() {
    try {
      var u = new URL(window.location.href);
      return u.searchParams.get('id');
    } catch (e) { return null; }
  }
  
  function numeroDesdePrecio(texto) {
    var limpio = '';
    for (var i = 0; i < (texto || '').length; i++) {
      var c = texto[i];
      if ((c >= '0' && c <= '9') || c === '.') limpio += c;
    }
    var n = parseFloat(limpio);
    return isNaN(n) ? 0 : n;
  }
  
  // ===============================
  // 2) Pintar card del curso
  // ===============================
  function renderCardCurso() {
    var id = getIdCurso();
    if (!id || !window.CURSOS || !CURSOS[id]) return;
  
    var c = CURSOS[id];
    var cont = document.getElementById('cursoSeleccionado');
    if (!cont) return;
  
    // Card horizontal simple (imagen, título, precio, botón detalle)
    cont.innerHTML = '' +
      '<div class="curso-detalle">' +
        '<img class="curso-imagen" src="' + c.imagen + '" alt="' + c.titulo + '">' +
        '<div class="curso-detalle-texto">' +
          '<h2 class="curso-titulo">' + c.titulo + '</h2>' +
          '<p class="curso-precio">' + (c.valor || '') + ' por empleado</p>' +
        '</div>' +
        '<button class="detalle-curso" type="button">Ver detalle</button>' +
      '</div>';
  
    var btn = cont.querySelector('.detalle-curso');
    if (btn) {
      btn.addEventListener('click', function () {
        window.location.href = './detalle-curso.html?id=' + id;
      });
    }
  }
  
  // ===============================
  // 3) Form empresas: agregar / eliminar filas
  //      - Clona el primer fieldset
  //      - Renumera ids/names
  // ===============================
  function renumerar() {
    var form = document.querySelector('.empleados__inscripcion-formulario');
    if (!form) return;
    var sets = form.querySelectorAll('fieldset');
    for (var i = 0; i < sets.length; i++) {
      var fs = sets[i];
      var nro = i + 1;
      var lg = fs.querySelector('legend');
      if (lg) lg.textContent = 'Cursante ' + nro;
  
      var inputs = fs.querySelectorAll('input');
      for (var j = 0; j < inputs.length; j++) {
        var base = (inputs[j].name || 'campo').replace(/[0-9]/g, '');
        inputs[j].name = base + nro;
        inputs[j].id = base + nro;
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
  
        // limpiar valores
        var ins = nuevo.querySelectorAll('input');
        for (var i = 0; i < ins.length; i++) ins[i].value = '';
  
        // insertar antes del botón submit
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
          alert('Debe quedar al menos un cursante.');
          return;
        }
        fs.remove();
        renumerar();
      };
    }
  }
  
  // ===============================
  // 4) Submit: armar objeto empresa y mandarlo al carrito
  //     - foto: imagen del curso
  //     - título: titulo del curso
  //     - detalle (en lugar de horas): "Personas: N"
  //     - precio: precioCurso * N (precioTexto y precioNumero)
  // ===============================
  function vincularSubmit() {
    var form = document.querySelector('.empleados__inscripcion-formulario');
    if (!form) return;
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      var id = getIdCurso();
      if (!id || !window.CURSOS || !CURSOS[id]) return;
      var c = CURSOS[id];
  
      var sets = form.querySelectorAll('fieldset');
      var cantidad = sets.length > 0 ? sets.length : 1;
  
      var pUnit = numeroDesdePrecio(c.valor || '0');
      var total = pUnit * cantidad;
  
      var itemEmpresa = {
        tipo: 'empresa',
        idCurso: id,
        // el carrito muestra "nombre" con <h3> en render normal
        descripcion: c.titulo,
        imagen: c.imagen,
        // acá reemplazamos “horas” por “Personas: N”
        duracion: 'Personas: ' + cantidad,
        precioTexto: '$' + total + ' USD',
        precioNumero: total
      };
  
      if (window.carrito && typeof window.carrito.agregarCurso === 'function') {
        window.carrito.agregarCurso(itemEmpresa);
      }
  
      alert('Inscripción agregada al carrito (' + cantidad + ' personas).');
    });
  }
  
  // ===============================
  // 5) Init
  // ===============================
  (function init() {
    renderCardCurso();
  
    // vincular + y − del primer fieldset
    var fs0 = document.querySelector('.empleados__inscripcion-formulario fieldset');
    if (fs0) vincularBotones(fs0);
  
    // renumerar por si el HTML inicial no arranca en 1
    renumerar();
  
    // submit
    vincularSubmit();
  })();
  