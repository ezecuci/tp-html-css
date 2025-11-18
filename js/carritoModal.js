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
        this.codigoAplicado = sessionStorage.getItem('carrito_codigo') || null;
        this.mensajeCodigo = sessionStorage.getItem('carrito_mensaje') || '';


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

                if (codigo === 'checode20') {
                    this.codigoAplicado = 'checode20';
                    sessionStorage.setItem('carrito_codigo', this.codigoAplicado);
                    this.mensajeCodigo = '<p class="mensaje--ok">¡Código de descuento aplicado!</p>';
                    sessionStorage.setItem('carrito_mensaje', this.mensajeCodigo);
                } else {
                    this.codigoAplicado = null;
                    sessionStorage.removeItem('carrito_codigo');
                    this.mensajeCodigo = '<p class="mensaje--error">Código no válido.</p>';
                    sessionStorage.setItem('carrito_mensaje', this.mensajeCodigo);
                }



                this.renderizarModal();
                return;
            }
            if (e.target.closest('.button--comprar')) {
                e.preventDefault();
                if (this.cursosAgregados.length === 0) {
                    const resumen = this.modal.querySelector('.form__resumen');
                    let m = resumen.querySelector('.carrito__mensaje-login');
                    if (!m) {
                        m = document.createElement('p');
                        m.className = 'mensaje--error carrito__mensaje-login';
                        m.textContent = 'Tu carrito está vacío.';
                        resumen.insertBefore(m, resumen.querySelector('.detalle--lista'));
                    } else {
                        m.textContent = 'Tu carrito está vacío.';
                    }return;}
                    
                    const sesion = sessionStorage.getItem('sesionActiva');
                    if (!sesion) {
                        const resumen = this.modal.querySelector('.form__resumen');
                        let m = resumen.querySelector('.carrito__mensaje-login');
                        if (!m) {
                            m = document.createElement('p');
                            m.className = 'mensaje--error carrito__mensaje-login';
                            m.textContent = 'Iniciá sesión para procesar el pago.';
                            resumen.insertBefore(m, resumen.querySelector('.detalle--lista'));
                        } else {
                            m.textContent = 'Iniciá sesión para procesar el pago.';
                        }
                        return;
                    }
                    window.location.href = './facturacion.html';
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
        
        for (let i = 0; i < this.cursosAgregados.length; i++) {
            const item = this.cursosAgregados[i];
            if (item && typeof item === 'object' && item.tipo === 'giftcard') {
              this.itemCurso += `
                <li class="carrito-item">
                  <img class="carrito-item__img" src="${item.imagen}" alt="${item.descripcion}">
                  <div class="carrito-item__info">
                    <h3 class="carrito-item__nombre">${item.descripcion}</h3>
                    <p class="carrito-item__detalles">${item.duracion}</p>
                    <button class="carrito-item__eliminar" type="button">Eliminar</button>
                  </div>
                  <div class="carrito-item__precio">${item.precioTexto}</div>
                </li>
              `;
              if (typeof item.precioNumero === 'number') {
                this.subtotal += item.precioNumero;
              }
              continue;
            }
            const indice = this.cursosAgregados[i];
            const curso = this.listCursos[indice];
            if (!curso) continue;
            
            this.itemCurso += `
            <li class="carrito-item">
            <img class="carrito-item__img" src="${curso.imagen}" alt="${curso.descripcion}">
            <div class="carrito-item__info">
            <h3 class="carrito-item__nombre">${curso.descripcion}</h3>
            <p class="carrito-item__detalles">${curso.duracion}</p>
            <button class="carrito-item__eliminar" type="button">Eliminar</button>
            </div>
            <div class="carrito-item__precio">${curso.precioTexto}</div>
            </li>
            `;
            
            if (typeof curso.precioNumero === 'number') {
                this.subtotal += curso.precioNumero;
            }
        }
        
        if (this.cursosAgregados.length === 0) {
            this.codigoAplicado = null;
            this.descuento = 0;
            this.mensajeCodigo = " ";
            sessionStorage.removeItem('carrito_codigo');
            sessionStorage.removeItem('carrito_mensaje');
        } else if (this.codigoAplicado === 'checode20') {
            this.descuento = this.subtotal * 0.2;
        } else {
            this.descuento = 0;
        }
        
        this.total = this.subtotal - this.descuento;
        if (this.total < 0) this.total = 0;
    }
        
        formatearPrecio(n) {
          return `$${Number(n).toFixed(2)} USD`;
        }

        renderizarModal() {
            this.renderizarCursos();
            
            const subtotalTxt  = this.formatearPrecio(this.subtotal);
            const descuentoTxt = '-' + this.formatearPrecio(this.descuento);
            const totalTxt     = this.formatearPrecio(this.total);
          
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
                ${this.mensajeCodigo || ''}
                <div class="cont--descuento">
                  <input type="text" class="input--descuento" name="cod_descuento"
                    placeholder="Ej: CHECODE20"
                    value="${this.codigoAplicado ? this.codigoAplicado.toUpperCase() : ''}">
                  <button class="aplicar--descuento">Aplicar</button>
                </div>
                <ul class="detalle--lista">
                  <li class="detalle--item"><div>Subtotal</div><div>${subtotalTxt}</div></li>
                  <li class="detalle--item"><div>Descuento</div><div>${descuentoTxt}</div></li>
                  <li class="detalle--item"><div>Total</div><div>${totalTxt}</div></li>
                </ul>
                <button class="button--comprar" type="button" ${this.cursosAgregados.length === 0 ? 'disabled' : ''}>Ir a pagar</button>
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
        let encontrado = false;
        for (let i = 0; i < this.cursosAgregados.length; i++) {
          if (this.cursosAgregados[i] == indice) {
            encontrado = true;
            break;
          }
        }
      
        if (encontrado) {
          this.mostrarModal();
          return;
        }
      
        this.cursosAgregados.push(indice);
        sessionStorage.setItem('carrito', JSON.stringify(this.cursosAgregados));
        this.actualizarContador();
        this.mostrarModal();
      
        if (this.cursosAgregados.length === 0) {
          this.codigoAplicado = null;
          this.mensajeCodigo = '';
          sessionStorage.removeItem('carrito_codigo');
          sessionStorage.removeItem('carrito_mensaje');
        }
      }

      agregarGiftcard(giftObj) {
        if (!giftObj || typeof giftObj !== 'object' || giftObj.precioNumero < 1) {
          return;
        }
        this.cursosAgregados.push(giftObj);
        sessionStorage.setItem('carrito', JSON.stringify(this.cursosAgregados));
        this.actualizarContador();
        this.mostrarModal();
      }
      
      
    actualizarContador() {
        this.contadorCarrito.innerHTML = `+${this.cursosAgregados.length}`;
    }
}