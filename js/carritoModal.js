import { RenderizadorDeCursos } from "./renderizadorDeCursos";

export class CarritoModal{

    constructor(){

        this.itemCurso = '';
        this.subtotal = 0;
        this.descuento = 0;
        this.total = 0;

        this.renderizadorDeCursos = new RenderizadorDeCursos();

        this.listCursos = this.renderizadorDeCursos.cursosInicio.concat(this.renderizadorDeCursos.masCursos);

        this.cursosAgregados = JSON.parse(sessionStorage.getItem('carrito')) || [];

        this.renderizarCursos();

        this.modal = document.createElement('article');
        this.modal.classList.add('modal__contenedor');
        this.modal.innerHTML = `
            <h4 class="modal--titulo">¡Solo queda un paso para finalizar la compra!
            </h4>
            <div class="modal__cursos">
                <ul class="cursos--lista">
                    ${this.itemCurso}
                </ul>
            </div>
            <div class="form__resumen">
                <h4 class="resumen--titulo">Resumen</h4>
                <label class="descuento--label" for="descuento">Código de descuento
                    <input class="descuento--input" type="text" name="descuento" id="descuento" placeholder="Ej:CHECODE20" >
                    </input>
                    <button class="descuento>aplicar</button>  
                </label>
                <ul class="detalle--lista">
                    <li class="detalle--item">
                        <div>Total</div>   <div>${this.subtotal}</div>
                    </li>
                    <li class="detalle--item">
                        <div>Descuento</div>   <div>${this.descuento}</div>
                    </li>
                    <li class="detalle--item">
                        <div>Total</div>   <div>${this.total}</div>
                    </li>        
                </ul>
                <button class="button--comprar" type="button">Ir a pagar</button>
                <a href="./cursos.html">Ver más cursos</a>
            </div>
        `
    }
    
    this.modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('carrito-item__eliminar')) {
            const index = Array.from(this.modal.querySelectorAll('.carrito-item__eliminar')).indexOf(e.target);
            this.eliminarCurso(index);
        }
    });

    renderizarCursos() {

        this.itemCurso = '';
        this.subtotal = 0;

        this.cursosAgregados.forEach(indice => {
            
            const curso = this.listCursos[indice];
            
            this.itemCurso += `
                <li class="carrito-item">
                    <img class="carrito-item__img" src="${curso.imagen}" alt="${curso.descripcion}">
                    <div class="carrito-item__info">
                        <h3 class="carrito-item__nombre">${curso.descripcion}</h3>
                        <p class="carrito-item__detalles">${curso.duracion}</p>
                        <button class="carrito-item__eliminar" type="button">Eliminar</button>
                    </div>
                    <div class="carrito-item__precio">${curso.precio}</div>
                </li>
            `;

            this.subtotal += curso.precio;
        });

        this.total = this.subtotal - this.descuento;

    }

    eliminarCurso(index) {

        this.cursosAgregados.splice(index, 1);

        sessionStorage.setItem('carrito', JSON.stringify(this.cursosAgregados));

        this.itemCurso = '';
        this.subtotal = 0;
        this.descuento = 0;
        this.total = 0;

        this.renderizarCursos;

        const lista = this.modal.querySelector('.cursos--lista');
        lista.innerHTML = this.itemCurso;
        
        const detalleLista = this.modal.querySelector('.detalle--lista');
        detalleLista.innerHTML = `
            <li class="detalle--item">
                <div>Subtotal</div> <div>$${this.subtotal}</div>
            </li>
            <li class="detalle--item">
                <div>Descuento</div> <div>-$${this.descuento}</div>
            </li>
            <li class="detalle--item">
                <div>Total</div> <div>$${this.total}</div>
            </li> 
        `;
    }
}