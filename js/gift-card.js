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