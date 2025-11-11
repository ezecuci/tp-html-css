import { Validador } from './Validador.js';
import { Modal } from './modal.js';

const modal = new Modal();

const validador = new Validador();

const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];


const form = document.querySelector('.registro__form');
const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const inputEmpresa = document.getElementById("nombre-empresa");
const labelEmpresa = document.querySelector(".nombre-empresa");
const labelPersonal = document.querySelector(".nombre-apellido");
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const inputPassword2 = document.getElementById('password2');
form.addEventListener('change', (e) => {

    const target = e.target;

    if(!target.matches('.registro__radioButton')) return;   
    if(target.value === 'personal'){
        labelPersonal.style.display = "";
        document.querySelector(".fila-personal").style.display = "flex";
        labelEmpresa.style.display = "none";
        inputEmpresa.style.display = "none";
        inputEmpresa.removeAttribute("required");
        inputNombre.setAttribute("required", "");
        inputApellido.setAttribute("required", "")
    }else if (target.value === 'empresa') {
        labelPersonal.style.display = "none";
        document.querySelector(".fila-personal").style.display = "none";
        inputNombre.removeAttribute("required");
        inputApellido.removeAttribute("required");
        labelEmpresa.style.display = "";
        inputEmpresa.style.display = "";
        inputEmpresa.setAttribute("required", "");
    }
});

form.addEventListener('submit', (e) => {

    e.preventDefault();

    const tipo = document.querySelector('.registro__radioButton:checked').value;
    const email = inputEmail.value.trim().toLowerCase();
    const password = inputPassword.value;
    const password2 = inputPassword2.value;
    let nombre = "";
    let apellido = "";
    let empresa = "";

    if(tipo === 'personal'){
        nombre = inputNombre.value.trim();
        apellido = inputApellido.value.trim();
        if (nombre === "" || apellido === "") {
            modal.mostrarMensaje("Completá nombre y apellido", () => {
                if (nombre === "") inputNombre.focus();
                else inputApellido.focus();
            }); return;
        }
        if (!validador.esNombrePropioValido(nombre.toUpperCase())) {
            modal.mostrarMensaje("El nombre no es válido", () => {
                inputNombre.focus();
            });
            return;
        }
        if (!validador.esNombrePropioValido(apellido.toUpperCase())) {
            modal.mostrarMensaje("El apellido no es válido", () => {
                inputApellido.focus();
            });
            return;
        }
        }else {
            empresa = inputEmpresa.value.trim();
            if (empresa.length < 2) {
                modal.mostrarMensaje("Ingresá el nombre de la empresa", () => {
                    inputEmpresa.focus();
                });
                return;
            }
        }

      if (!validador.esUnEmailValido(email)) {
        modal.mostrarMensaje(
          'El email ingresado no es válido.',
          () => {
            inputEmail.focus();
          }
        );
        return;
      }

      let existe = false;
      for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email) {
            existe = true;
            break;
        }
    }
      if (existe) {
        modal.mostrarMensaje('Ya existe una cuenta con ese email. Usá otro correo o iniciá sesión.',() => {
        inputEmail.focus();
      }
    );
    return;
  }
  
  if (!validador.esPasswordValida(password)) {
    modal.mostrarMensaje('La contraseña no es válida.<br>Debe tener mayúscula, minúscula, número y símbolo, y al menos 8 caracteres.', () => {
        inputPassword.focus();
      }
    );
    return;
  }

  if (!validador.sonIguales(password, password2)) {
    modal.mostrarMensaje('Las contraseñas no coinciden', () => {
      inputPassword2.focus();
    });
    return;
  }

  let nuevoUsuario = { tipo, email, password };

  if (tipo === "personal") {
    nuevoUsuario.nombre = nombre.toUpperCase();
    nuevoUsuario.apellido = apellido.toUpperCase();
  } else {
    nuevoUsuario.nombreEmpresa = empresa.toUpperCase();
  }
    
  usuarios.push(nuevoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  let sesionActiva = { tipo, email };

  if (tipo === "personal") {
    sesionActiva.nombre = nombre;
    sesionActiva.apellido = apellido;
  } else {
    sesionActiva.nombreEmpresa = empresa;
  }

  sessionStorage.setItem("sesionActiva", JSON.stringify(sesionActiva));
      modal.mostrarMensaje('Usuario registrado correctamente!', () => {
          form.reset();
          labelPersonal.style.display = "";
          document.querySelector(".fila-personal").style.display = "flex";
          labelEmpresa.style.display = "none";
          inputEmpresa.style.display = "none";
          window.location.href = './index.html';
      });
});