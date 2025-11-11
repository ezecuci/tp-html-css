import { Modal } from './modal.js';
import { Validador } from './Validador.js';
import { CarritoModal } from './carritoModal.js';

const carritoModal = new CarritoModal();

const modal = new Modal();
const validador = new Validador();

const form = document.querySelector('.pago__formulario');

const inputNumero = document.getElementById('numero-tarjeta');
const inputFecha = document.getElementById('vencimiento');
const inputCodigo = document.getElementById('codigo');
const inputTitular = document.getElementById('titular');


(function autocompletarTitularDesdeSesion() {
    const sesion = JSON.parse(sessionStorage.getItem('sesionActiva'));

    if (sesion && sesion.tipo === 'personal') {
        const nombreCompleto = `${sesion.nombre || ''} ${sesion.apellido || ''}`.trim();
        if (nombreCompleto) {
            inputTitular.value = nombreCompleto;
        }
    }
})();



inputNumero.addEventListener('input', (e) => {
    
    let valor = inputNumero.value.replace(/\D/g, ''); 
    valor = valor.substring(0, 16); 

    
    const bloques = valor.match(/.{1,4}/g) || [];
    inputNumero.value = bloques.join(' ');
});


inputNumero.addEventListener('paste', (e) => {
    e.preventDefault();
    const texto = (e.clipboardData || window.clipboardData).getData('text');
    const soloDigitos = texto.replace(/\D/g, '').substring(0, 16);
    const bloques = soloDigitos.match(/.{1,4}/g) || [];
    inputNumero.value = bloques.join(' ');
});



inputFecha.addEventListener('input', () => {
    let valor = inputFecha.value.replace(/\D/g, ''); 
    valor = valor.substring(0, 4); 
    if (valor.length > 2) {
        valor = valor.substring(0, 2) + '/' + valor.substring(2);
    }
    inputFecha.value = valor;
});


inputCodigo.addEventListener('input', () => {
   
    let v = inputCodigo.value.replace(/\D/g, '').substring(0, 3);
    inputCodigo.value = v;
});


form.addEventListener('submit', (event) => {
    event.preventDefault();

    const numeroTarjetaRaw = inputNumero.value.replace(/\s/g, ''); 
    const numeroTarjetaFormateado = inputNumero.value.trim(); 
    const fecha = inputFecha.value.trim();
    const codigo = inputCodigo.value.trim(); 
    const titular = inputTitular.value.trim();


    if (!validador.esNumeroTarjetaValido(numeroTarjetaFormateado)) {
        modal.mostrarMensaje('Número de tarjeta inválido. Debe contener 16 dígitos.', () => {
            inputNumero.focus();
        });
        return;
    }

    if (!validador.esFechaVencimientoValida(fecha)) {
        modal.mostrarMensaje('Fecha inválida. El formato debe ser MM/AA.', () => {
            inputFecha.focus();
        });
        return;
    }

    if (!validador.esCodigoSeguridadValido(codigo)) {
        modal.mostrarMensaje('Código de seguridad inválido. Debe tener 3 dígitos.', () => {
            inputCodigo.focus();
        });
        return;
    }

    if (titular.length < 3) {
        modal.mostrarMensaje('Ingrese el nombre del titular.', () => {
            inputTitular.focus();
        });
        return;
    }


    modal.mostrarMensaje('Pago procesado correctamente', () => {
        form.reset();

        window.location.href = './perfil-usuario.html';
    });
});

const btnAgregar = document.querySelectorAll('.btn--agregar');

btnAgregar.forEach((btn, indice) => {
    btn.addEventListener('click', () => {
        carritoModal.agregarCurso(indice);
    });
});
