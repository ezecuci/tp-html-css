
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

    for ( const actual of usuarios){

        if(actual.email === email){

            if( actual.password === password){

                return true;
            }else {

            alert('contraseña incorrecta, intentelo nuevamente');
            
            inputContrasenia.focus();
            return false;
            
            }
        }

    }

    alert('ingreso invalido, el email ingresado no se encuentra registrado');
    inputEmail.focus();
    return false;

}