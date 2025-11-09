export class RenderizadorDeCursos{

    constructor(){

        this.cursosInicio = [
            {
                imagen: './images/curso_1.png',
                descripcion: "Desarrollo de API REST con Spring Boot y Maven",
                duracion:80,
                precio:25,
                enlace: './detalle-curso1.html',
                id:0
            },
            {
                imagen: './images/curso_2.png',
                descripcion: 'Modelos de Machine Learning con TensorFlow y Scikit-learn',
                duracion: 120,
                precio: 30,
                enlace: './detalle-curso2.html',
                id:1
            },
            {
                imagen: './images/curso_3.png',
                descripcion: 'Maquetación de layouts modernos con Flexbox y CSS Grid',
                duracion: 40,
                precio: 20,
                enlace: './detalle-curso3.html',
                id:2
            },
            {
                imagen: './images/curso_4.png',
                descripcion: 'Manipulación y análisis de datos con Pandas y NumPy',
                duracion: 70,
                precio: 25,
                enlace: './detalle-curso4.html',
                id:3
            }
        ];

        this.masCursos = [
            {
                imagen: "./images/curso_5.png",
                descripcion: "Pentesting y análisis de vulnerabilidades con Kali Linux",
                duracion: 90,
                precio: 30,
                enlace: "./detalle-curso5.html",
                id:4
            },
            {
                imagen: "./images/curso_6.png",
                descripcion: "Interfaces nativas y declarativas con Jetpack Compose (Android) y SwiftUI (iOS)",
                duracion: 100,
                precio: 30,
                enlace: "./detalle-curso6.html",
                id:5
            },
            {
                imagen: "./images/curso_7.png",
                descripcion: "Desarrollo Web Full Stack con Node.js y React",
                duracion: 150,
                precio: 35,
                enlace: "./detalle-curso7.html",
                id:6
            },
            {
                imagen: "./images/curso_8.png",
                descripcion: "JavaScript Avanzado: asincronía, módulos y APIs",
                duracion: 60,
                precio: 22,
                enlace: "./detalle-curso8.html",
                id:7
            },
            {
                imagen: "./images/curso_9.png",
                descripcion: "Programación Backend con Python y Django",
                duracion: 100,
                precio: 28,
                enlace: "./detalle-curso9.html",
                id:8
            },
            {
                imagen: "./images/curso_10.png",
                descripcion: "Desarrollo de aplicaciones móviles con React Native",
                duracion: 90,
                precio: 30,
                enlace: "./detalle-curso10.html",
                id:9
            },
            {
                imagen: "./images/curso_11.png",
                descripcion: "Maquetación avanzada con animaciones y transiciones CSS",
                duracion: 50,
                precio: 18,
                enlace: "./detalle-curso11.html",
                id:10
            },
            {
                imagen: "./images/curso_12.png",
                descripcion: "Bases de datos relacionales y NoSQL con MySQL y MongoDB",
                duracion: 110,
                precio: 27,
                enlace: "./detalle-curso12.html",
                id:11
            }
        ]

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
            Duración: ${curso.duracion} hs<br>
            Precio: $${curso.precio} USD
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