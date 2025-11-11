import { RenderizadorDeCursos } from "./renderizadorDeCursos.js";
import { CarritoModal } from "./carritoModal.js";

const carritoModal = new CarritoModal();

const contenedorCursos = document.querySelector('.cursos__cards--todas');
const tarjetas = new RenderizadorDeCursos();
tarjetas.renderizarTarjetas(contenedorCursos);




const btnAgregar = document.querySelectorAll('.btn--agregar');

btnAgregar.forEach((btn, indice) => {
    btn.addEventListener('click', () => {
        carritoModal.agregarCurso(indice);
    });
});
