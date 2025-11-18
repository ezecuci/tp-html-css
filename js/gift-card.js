import { Validador } from './Validador.js';
import { Modal } from './modal.js';

const validador = new Validador();
const modal = new Modal();

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

const vista = document.querySelector(".vista_previa");
const vistaNombre = document.querySelector(".destinatario_vistaprevia h1");
const vistaMonto = document.querySelector(".monto_vistaprevia h2");
const contMonto = document.querySelector(".monto_vistaprevia");
const contNombre = document.querySelector(".destinatario_vistaprevia");
const form = document.querySelector(".datos_giftcard");
const inputNombre = document.getElementById("name");
const inputMonto = document.getElementById("monto");
const radiosColor = document.querySelectorAll('input[name="Color"]');
const radiosFuente = document.querySelectorAll('input[name="fuente"]');
const radiosUbicacion = document.querySelectorAll('input[name="ubicacion"]');
const radiosFondo = document.querySelectorAll('input[name="fondo"]');

inputNombre.addEventListener("input", () => {
  const valor = inputNombre.value.trim();
  vistaNombre.textContent = valor === "" ? "Destinatario" : valor;
});

function actualizarPreviewMonto() {
  const valor = inputMonto.value.trim();
  vistaMonto.textContent =
    valor === "" ? "$$$" : "$" + valor;
}


inputMonto.addEventListener("input", actualizarPreviewMonto);
radiosColor.forEach((radio) => {
  radio.addEventListener("change", () => {
    let color = "#5b89a6";

    switch (radio.value) {
      case "celeste":
        color = "#5b89a6";
        break;
      case "azul":
        color = "#032340";
        break;
      case "rojo":
        color = "rgb(255, 0, 43)";
        break;
      case "bordo":
        color = "rgb(104, 0, 17)";
        break;
    }
    vistaMonto.style.backgroundColor = color;
    vistaMonto.style.boxShadow = `0 0 1rem ${color}`;
  });
});

radiosFuente.forEach((radio) => {
  radio.addEventListener("change", () => {
    vistaNombre.style.fontSize = radio.value;
  });
});

radiosUbicacion.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "izquierda") {
      contMonto.style.justifyContent = "flex-start";
    } else if (radio.value === "centro") {
      contMonto.style.justifyContent = "center";
    } else if (radio.value === "derecha") {
      contMonto.style.justifyContent = "flex-end";
    }
  });
});

function aplicarFondoSeleccionado() {
  const seleccionado = document.querySelector('input[name="fondo"]:checked');
  if (!seleccionado) return;

  if (seleccionado.value === "fondo1") {
    vista.style.backgroundImage = "url('./images/fondo gift card.png')";
  } else if (seleccionado.value === "fondo2") {
    vista.style.backgroundImage = "url('./images/oficina developer 3.png')";
  } else if (seleccionado.value === "fondo3") {
    vista.style.backgroundImage = "url('./images/wefw.png')";
  }
  vista.style.backgroundSize = "cover";
  vista.style.backgroundPosition = "center";
}

radiosFondo.forEach((radio) => {
  radio.addEventListener("change", aplicarFondoSeleccionado);
});

aplicarFondoSeleccionado();
actualizarPreviewMonto();


function getFondo() {
  const seleccionado = document.querySelector('input[name="fondo"]:checked');
  if (!seleccionado) return './images/fondo gift card.png';
  if (seleccionado.value === 'fondo2') return './images/oficina developer 3.png';
  if (seleccionado.value === 'fondo3') return './images/wefw.png';
  return './images/fondo gift card.png';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let nombre = inputNombre.value.trim();
  if (!validador.esNombrePropioValido(nombre.toUpperCase())) {
      modal.mostrarMensaje("El nombre no es válido", () => {
          inputNombre.focus();
      });
      return;
  }

  let monto = inputMonto.value.trim();
  if (!validador.esMontoValido(monto)) {
      modal.mostrarMensaje("El monto no es válido", () => {
          inputMonto.focus();
      });
      return;
  }

  monto = Number(inputMonto.value);
  nombre = (inputNombre.value || '').trim() || 'Destinatario';
  const imagen = getFondo();

  const gift = {
    tipo: 'giftcard',
    descripcion: `Giftcard para ${nombre}`,
    duracion: 'Aplicable a cualquiera de nuestros cursos!',
    precioNumero: monto,
    precioTexto: (window.carrito && typeof window.carrito.formatearPrecio === 'function')
      ? window.carrito.formatearPrecio(monto)
      : `$${monto} USD`,
    imagen
  };

  if (window.carrito && typeof window.carrito.agregarGiftcard === 'function') {
    window.carrito.agregarGiftcard(gift);
  }
});
