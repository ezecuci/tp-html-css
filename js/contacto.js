import { Modal } from "./modal.js";
import { Validador } from "./Validador.js";

export class Contacto {
    constructor() {
        this.modal = new Modal();
        this.validador = new Validador();
        this.form = document.querySelector('.form__elements');

        if (this.form) {
            this.form.addEventListener('submit', (e) => this.enviarFormulario(e));
        } else {
            console.error("No se encontró el formulario con la clase .form__elements");
        }
    }

    enviarFormulario(e) {
        e.preventDefault();

        const inputNombre = document.querySelector('#name');
        const inputApellido = document.querySelector('#Surname');
        const inputEmail = document.querySelector('#email');
        const inputTelefono = document.querySelector('#telephone');
        const inputConsulta = document.querySelector('#textarea');

        const nombre = inputNombre?.value.trim().toUpperCase();
        const apellido = inputApellido?.value.trim().toUpperCase();
        const email = inputEmail?.value.trim();
        const telefono = inputTelefono?.value.trim();
        const consulta = inputConsulta?.value.trim();

        if (!this.validador.esNombrePropioValido(nombre)) {
            this.modal.mostrarMensaje("El nombre no es válido", () => {
                inputNombre.focus();
            });
            return;
        }

        if (!this.validador.esNombrePropioValido(apellido)) {
            this.modal.mostrarMensaje("El apellido no es válido", () => {
                inputApellido.focus();
            });
            return;
        }

        if (!this.validador.esUnEmailValido(email)) {
            this.modal.mostrarMensaje("El email no es válido", () => {
                inputEmail.focus();
            });
            return;
        }

        if (telefono && !this.validador.esTelefonoValido(telefono)) {
            this.modal.mostrarMensaje("El teléfono no es válido", () => {
                inputTelefono.focus();
            });
            return;
        }

        if (consulta && !this.validador.esMensajeValido(consulta)) {
            this.modal.mostrarMensaje("La consulta ingresada no es válida", () => {
                inputConsulta.focus();
            });
            return;
        }

        this.modal.mostrarMensaje("Formulario enviado con éxito", () => {
            this.form.reset();
            window.location.href = "./index.html";
        });

        
    }
}

new Contacto();
