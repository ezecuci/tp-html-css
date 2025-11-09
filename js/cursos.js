import { RenderizadorDeCursos } from "./renderizadorDeCursos.js";

const contenedorCursos = document.querySelector('.cursos__cards--todas');
const tarjetas = new RenderizadorDeCursos();
tarjetas.renderizarTarjetas(contenedorCursos);
