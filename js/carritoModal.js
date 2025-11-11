import { RenderizadorDeCursos } from "./renderizadorDeCursos.js";
import { Modal } from "./modal.js";

export class CarritoModal {
    constructor() {
        this.notifModal = new Modal();

        this.itemCurso = '';
        this.subtotal = 0;
        this.descuento = 0;
        this.total = 0;

        this.codigoAplicado = sessionStorage.getItem('carrito_codigo') || null;

        this.contadorCarrito = document.querySelector('.contador-carrito');

        this.renderizadorDeCursos = new RenderizadorDeCursos();
        this.listCursos = this.renderizadorDeCursos.cursosInicio.concat(this.renderizadorDeCursos.masCursos);

        this.cursosAgregados = JSON.parse(sessionStorage.getItem('carrito')) || [];


        this.modal = document.createElement('article');
        this.modal.classList.add('modal__contenedor');


        this.modal.addEventListener('click', (e) => {
            const target = e.target;

          
            if (target.classList.contains('modal--cerrar')) {
                this.modal.remove();
                return;
            }

          
            if (target.classList.contains('carrito-item__eliminar')) {
                const botones = Array.from(this.modal.querySelectorAll('.carrito-item__eliminar'));
                const index = botones.indexOf(target);
                if (index > -1) this.eliminarCurso(index);
                return;
            }

          
            if (target.classList.contains('aplicar--descuento')) {
                const inputCodigo = this.modal.querySelector('.input--descuento');
                
                let codigo = '';
                if (inputCodigo) {
                    codigo = inputCodigo.value.trim().toLowerCase();
                }

                if (this.cursosAgregados.length === 0) {
                    this.notifModal.mostrarMensaje('Tu carrito está vacío. Agrega cursos para aplicar un código.');
                    return;
                }

                if (codigo === 'checode20') {
                    this.codigoAplicado = 'checode20';
                    sessionStorage.setItem('carrito_codigo', this.codigoAplicado);
                    this.notifModal.mostrarMensaje('Código aplicado: 20% de descuento.');
                } else {
                    this.codigoAplicado = null;
                    sessionStorage.removeItem('carrito_codigo');
                    this.notifModal.mostrarMensaje('Código no válido.');
                }

                this.renderizarModal();
                return;
            }
        });

        this.btnCarritoHeader = document.querySelector('.header__cart');
        this.btnCarritoHeader.addEventListener('click', () => this.abrirCerrarModal());

        this.renderizarModal();
        this.actualizarContador();
    }

    renderizarCursos() {
        this.itemCurso = '';
        this.subtotal = 0;

        this.cursosAgregados.forEach(indice => {
            const curso = this.listCursos[indice];
            if (!curso) return;

            this.itemCurso += `
                <li class="carrito-item">
                    <img class="carrito-item__img" src="${curso.imagen}" alt="${curso.descripcion}">
                    <div class="carrito-item__info">
                        <h3 class="carrito-item__nombre">${curso.descripcion}</h3>
                        <p class="carrito-item__detalles">${curso.duracion} hs</p>
                        <button class="carrito-item__eliminar" type="button">Eliminar</button>
                    </div>
                    <div class="carrito-item__precio">$${curso.precio}</div>
                </li>
            `;
            this.subtotal += curso.precio;
        });

        if (this.cursosAgregados.length === 0) {
            this.codigoAplicado = null;
            this.descuento = 0;
            sessionStorage.removeItem('carrito_codigo');
        } else if (this.codigoAplicado === 'checode20') {
            this.descuento = this.subtotal * 0.2;
        } else {
            this.descuento = 0;
        }

        this.total = this.subtotal - this.descuento;
    }

    renderizarModal() {
        this.renderizarCursos();

        this.modal.innerHTML = `
            <div class="cont--superior">
                <h4 class="modal--titulo">¡Solo queda un paso para finalizar la compra!</h4>
                <button class="modal--cerrar">&times;</button>
            </div>
            <div class="modal__cursos">
                <ul class="cursos--lista">
                    ${this.itemCurso || '<p>Tu carrito está vacío</p>'}
                </ul>
            </div>
            <div class="form__resumen">
                <h4 class="resumen--titulo">Resumen</h4>
                <p>Código de descuento</p>
                <div class="cont--descuento">
                    <input type="text" class="input--descuento" name="cod_descuento"
                        placeholder="Ej: CHECODE20"
                        value="${this.codigoAplicado ? this.codigoAplicado.toUpperCase() : ''}">
                    <button class="aplicar--descuento">Aplicar</button>
                </div>
                <ul class="detalle--lista">
                    <li class="detalle--item"><div>Subtotal</div><div>$${this.subtotal}</div></li>
                    <li class="detalle--item"><div>Descuento</div><div>-$${this.descuento}</div></li>
                    <li class="detalle--item"><div>Total</div><div>$${this.total}</div></li>
                </ul>
                <a class="link--pagar" href="./facturacion.html">
                    <button class="button--comprar" type="button" ${this.cursosAgregados.length === 0 ? 'disabled' : ''}>
                        Ir a pagar
                    </button>
                </a>
                <a href="./cursos.html">Ver más cursos</a>
            </div>
        `;
    }

    mostrarModal() {
        this.renderizarModal();
        if (!document.body.contains(this.modal)) {
            document.body.appendChild(this.modal);
        }
    }

    abrirCerrarModal() {
        const existe = document.querySelector('.modal__contenedor');
        if (existe) {
            existe.remove();
        } else {
            this.mostrarModal();
        }
    }

    eliminarCurso(index) {
        this.cursosAgregados.splice(index, 1);
        sessionStorage.setItem('carrito', JSON.stringify(this.cursosAgregados));
        this.actualizarContador();
        this.renderizarModal();
    }

    agregarCurso(indice) {
        this.cursosAgregados.push(indice);
        sessionStorage.setItem('carrito', JSON.stringify(this.cursosAgregados));
        this.actualizarContador();
        this.mostrarModal();
    }

    actualizarContador() {
        this.contadorCarrito.innerHTML = `+${this.cursosAgregados.length}`;
    }
}
