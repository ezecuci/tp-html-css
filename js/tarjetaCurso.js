export class TarjetaCurso{

    constructor(){

        this.cursos = [
            {
                imagen: './images/curso_1.png',
                descripcion: "Desarrollo de API REST con Spring Boot y Maven",
                duracion:80,
                precio:25,
                enlace: './detalle-curso1.html'
            },
            {
                imagen: './images/curso_2.png',
                descripcion: 'Modelos de Machine Learning con TensorFlow y Scikit-learn',
                duracion: 120,
                precio: 30,
                enlace: './detalle-curso2.html'
            },
            {
                imagen: './images/curso_3.png',
                descripcion: 'Maquetación de layouts modernos con Flexbox y CSS Grid',
                duracion: 40,
                precio: 20,
                enlace: './detalle-curso3.html'
            },
            {
                imagen: './images/curso_4.png',
                descripcion: 'Manipulación y análisis de datos con Pandas y NumPy',
                duracion: 70,
                precio: 25,
                enlace: './detalle-curso4.html'
            }
        ];

    }

  renderizarTarjetas(contenedor) {
    contenedor.innerHTML = '';

    this.cursos.forEach(curso => {
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
            Duración: ${curso.duracion} hs<br>
            Precio: $${curso.precio} USD
          </a>
        </article>
        <a href="${curso.enlace}">
          <button>Ver detalle</button>
          <button>Agregar al carrito</button>
        </a>
      `;

      contenedor.appendChild(tarjeta);
    });
  }
}