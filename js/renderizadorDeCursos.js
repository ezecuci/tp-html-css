export class RenderizadorDeCursos{
  constructor() {
    const todos = [];
    let indice = 0;
    for (let idCurso in CURSOS) {
      const c = CURSOS[idCurso];
      let precioNumero = 0;
      let texto = typeof c.valor === 'string' ? c.valor : String(c.valor);
      let limpio = '';
      for (let i = 0; i < texto.length; i++) {
        const  caracter = texto[i];
        if ((caracter >= '0' && caracter <= '9') || caracter === '.') {
          limpio += caracter;
        }
      }
      if (limpio !== '') {
        precioNumero = parseFloat(limpio);
       }
      const nuevo = {
        imagen: c.imagen,
        descripcion: c.titulo,
        duracion: c.duracion,
        precioTexto: texto,
        precioNumero: precioNumero,
        enlace: `./detalle-curso.html?id=${idCurso}`,
        id: indice
      };
      todos.push(nuevo);
      indice++;
    }
    this.cursosInicio = [];
    this.masCursos = [];
    for (let i = 0; i < todos.length; i++) {
      if (i < 4) {
        this.cursosInicio.push(todos[i]);
      } else {
        this.masCursos.push(todos[i]);
      }
    }
  }

  renderizarTarjetas(contenedor) {
    contenedor.innerHTML = '';

    let listaDeCursos = [];

    if(contenedor.classList.contains('cursos__cards')) {
      listaDeCursos = this.cursosInicio;
    }

    if(contenedor.classList.contains('cursos__cards--todas')) {
      listaDeCursos = this.cursosInicio.concat(this.masCursos);
    }

    listaDeCursos.forEach(curso => {
      const tarjeta = document.createElement('li');
      tarjeta.classList.add('card');

      tarjeta.innerHTML = `
        <article class="card__img">
          <a href="${curso.enlace}">
            <img src="${curso.imagen}" alt="${curso.descripcion}" />
          </a>
        </article>
        <article class="curso__detail">
          <a href="${curso.enlace}">
            ${curso.descripcion}<br>
            Duración: ${curso.duracion}<br>
            Precio: ${curso.precioTexto}
          </a>
        </article>
        <a href="${curso.enlace}">
          <button>Ver detalle</button>
        </a>
          <button class="btn--agregar">Agregar al carrito</button>
        
      `;

      contenedor.appendChild(tarjeta);
    });
  }

  
}