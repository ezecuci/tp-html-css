export class Modal {
    constructor() {
        this.modal = document.createElement('div');
        this.modal.classList.add('modal');
        this.modal.innerHTML = `
            <div class="modal__contenedorNotif">
                <button class="modal__cerrar">&times;</button>
                <div class="modal__mensaje"></div>
                <button class="modal__continuar">Continuar</button>
            </div>
        `;

        this.btnCerrar = this.modal.querySelector('.modal__cerrar');
        this.btnContinuar = this.modal.querySelector('.modal__continuar');

        this.btnCerrar.addEventListener('click', () => this.cerrar());
        this.btnContinuar.addEventListener('click', () => this.cerrar());

        this.modal.addEventListener('click', (event) => {
            if (event.target === this.modal) this.cerrar();
        });
    }

    mostrarMensaje(mensaje, funcionExterna = null) {
      
        if (!document.body.contains(this.modal)) {
            document.body.appendChild(this.modal);
        }

        const contenedorMensaje = this.modal.querySelector('.modal__mensaje');
        contenedorMensaje.innerHTML = mensaje;

        this.modal.classList.add('modal__visible');

        this.btnContinuar.onclick = () => {
            this.cerrar();
            if (funcionExterna) funcionExterna();
        };
    }

    cerrar() {
        this.modal.classList.remove('modal__visible');
    }
}