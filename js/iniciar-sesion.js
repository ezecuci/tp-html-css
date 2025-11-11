import { Modal } from './modal.js'; 
const modal = new Modal();
const form = document.querySelector('.login__form');
const inputEmail = document.getElementById('email');
const inputContrasenia = document.getElementById('password');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = inputEmail.value.trim().toLowerCase();
    const contrasenia = inputContrasenia.value;
    if(sePuedeIniciarSesion(email, contrasenia)){
        form.reset();
        window.location.href = './index.html';
    }
});

function sePuedeIniciarSesion(email, password){
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    for (let i = 0; i < usuarios.length; i++){
        const actual = usuarios[i];
        if(actual.email === email){
            if (actual.password === password) {
                if (actual.tipo === 'personal') {
                    sessionStorage.setItem('sesionActiva', JSON.stringify({
                        tipo: 'personal',
                        email: actual.email,
                        nombre: actual.nombre,
                        apellido: actual.apellido
                    }));
                } else if (actual.tipo === 'empresa') {
                    sessionStorage.setItem('sesionActiva', JSON.stringify({
                        tipo: 'empresa',
                        email: actual.email,
                        nombreEmpresa: actual.nombreEmpresa
                    }));
                }
                return true;
            }else {
                modal.mostrarMensaje('contraseña incorrecta, intentelo nuevamente' , () => {
                    inputContrasenia.focus();
                });
                return false;
            }
        }
    }
    modal.mostrarMensaje('ingreso invalido, el email ingresado no se encuentra registrado', () => {
        inputEmail.focus();
    });
    return false;
}