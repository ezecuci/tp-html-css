
// codigo para modificar el label y placeholder de tipo de usuario
// con el input radio 

import { Validador } from './Validador.js';
import { Modal } from './modal.js';

const modal = new Modal();

const validador = new Validador();

const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];


const form = document.querySelector('.registro__form');
const labelNombreApellido = document.querySelector('.nombre-apellido');
const inputNombreApellido = document.getElementById('nombre-apellido');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const inputPassword2 = document.getElementById('password2');

form.addEventListener('change', (e) => {

    const target = e.target;

    if(!target.matches('.registro__radioButton')) return;   
    if(target.value === 'personal'){
        labelNombreApellido.textContent = 'Nombre y apellido';
        inputNombreApellido.placeholder = 'Nombre y apellido';
    }else if (target.value === 'empresa') {
        labelNombreApellido.textContent = 'Nombre de empresa'; 
        inputNombreApellido.placeholder = 'Nombre de empresa';
    }
});

// REGISTRO DE USUARIO ---->>>

form.addEventListener('submit', (e) => {

    e.preventDefault();

    const tipo = document.querySelector('.registro__radioButton:checked').value;
    const nombreIngresado = inputNombreApellido.value.trim();
    const email = inputEmail.value.trim().toLowerCase();
    const password = inputPassword.value;
    const password2 = inputPassword2.value;

    if(tipo === 'personal'){
        if (!nombreIngresado.includes(' ')) {
            modal.mostrarMensaje('Ingresá tu nombre y apellido', () => {
              inputNombre.focus();
            });
            return;}
        }else {
        if (nombreIngresado.length < 2) {
          modal.mostrarMensaje('Ingresá el nombre de la empresa', () => {
            inputNombre.focus();
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

      const existe = usuarios.some((u) => u.email === email);
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


  const nuevoUsuario = {tipo, nombre: nombreIngresado.toUpperCase(), email, password};

  usuarios.push(nuevoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  sessionStorage.setItem(
    'sesionActiva',
    JSON.stringify({
      email,
      nombre: nombreIngresado,
    })
  );
  modal.mostrarMensaje('Usuario registrado correctamente!', () => {
    form.reset();
    window.location.href = './index.html';
  });
});

    
