

// codigo para modificar el label y placeholder de tipo de usuario
// con el input radio 

import { Validador } from './Validador.js';

const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

const validador = new Validador();

const form = document.querySelector('.registro__form');
const labelApellido = document.querySelector('.apellido');
const inputApellido = document.getElementById('apellido');


const labelNombre = document.querySelector('.nombre');
const inputNombre = document.getElementById('nombre');

const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const inputPassword2 = document.getElementById('password2');

form.addEventListener('change', (e) => {

    const target = e.target;

    if(!target.matches('.registro__radioButton')) return;
        
    if(target.value === 'personal'){

        labelApellido.textContent = 'Apellido';
        inputApellido.placeholder = 'Apellido';

        inputNombre.style.display = '';
        labelNombre.style.display = '';
        inputNombre.setAttribute('required', '');   

    }else if (target.value === 'empresa') {

        labelApellido.textContent = 'Nombre de empresa'; 
        inputApellido.placeholder = 'Nombre de empresa';

        inputNombre.style.display = 'none';
        labelNombre.style.display = 'none';
        inputNombre.removeAttribute('required');   
    }
});

// REGISTRO DE USUARIO ---->>>

form.addEventListener('submit', (e) => {

    e.preventDefault();

    const tipo = document.querySelector('.registro__radioButton:checked').value;

    let nombre = null;

    if(tipo === 'personal'){
        nombre = inputNombre.value.trim().toUpperCase();
    }

    const apellido = inputApellido.value.trim().toUpperCase(); 
    const email = inputEmail.value.trim().toLowerCase();;
    const password = inputPassword.value;
    const password2 = inputPassword2.value;
    
    const valido = validacionDeIngreso(apellido, nombre, email, password, password2, tipo);

    if(!valido) return;
        
    const nuevoUsuario = {apellido, nombre, email, password, tipo};
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Usuario registrado correctamente');
    form.reset();

    window.location.href = './index.html';
 });



function validacionDeIngreso(apellido, nombre, email, password, password2, tipo){
    
    if(!validador.esNombrePropioValido(apellido)){
        alert('El apellido ingresado no es valido');
        inputApellido.focus();
        return false;
    }

    if(tipo === 'personal' && !validador.esNombrePropioValido(nombre)){
        alert('El nombre ingresado no es valido');
        inputNombre.focus();
        return false;
    }

    if(!validador.esUnEmailValido(email)){
        alert('el email ingresado no es valido\nUtilice el siguiente formato: usuario@ejemplo.com');
        inputEmail.focus();
        return false;
    }

    const existe = usuarios.some(u => u.email === email);
    if (existe) {
        alert('Ya existe una cuenta con ese email. Usá otro correo o iniciá sesión');
        inputEmail.focus();
        return false;
    }

    if(!validador.esPasswordValida(password)){
        alert('La contraseña ingresada no es valida');
        inputPassword.focus();
        return false;
    }

    if(!validador.sonIguales(password, password2)){
        alert('las contraseñas ingresadas no coinciden');
        inputPassword.focus();
        return false;
    }

    return true;

}

