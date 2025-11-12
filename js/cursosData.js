window.CURSOS = {
    "desarrollo-api": {
      titulo: "Desarrollo de API REST con Spring Boot y Maven",
      imagen: "./images/curso_1.png",
      valor: "$25 USD",
      duracion: "80 hs",
      descripcion: " Aprende a diseñar y construir APIs REST profesionales con Spring Boot: controladores, validaciones, servicios y persistencia con JPA/Hibernate. Documentarás con OpenAPI, asegurarás con JWT y empaquetarás con Maven. Ideal para quienes desean pasar de “saber Java” a publicar servicios robustos y listos para producción",
      requisitos: " Java básico y POO, nociones de HTTP/JSON, manejo básico de Maven, uso de un IDE (IntelliJ/Eclipse) y Git opcional.",
      docente: {
        nombre: "Juan Perez",
        foto: "./images/juan_perez.png",
        estrellas: 3,
        bio: "Juan Perez es Ingeniero en Sistemas con más de 10 años de experiencia desarrollando aplicaciones empresariales en Java. Se especializa en el diseño de arquitecturas escalables con Spring Boot, Hibernate y microservicios. Ha trabajado en empresas de software nacionales e internacionales, liderando equipos ágiles y capacitando a nuevos programadores. Actualmente dicta cursos y talleres orientados a formar desarrolladores en el ecosistema Java, con foco en buenas prácticas, seguridad y despliegue en la nube."
      },
      modulos: [
        {
          titulo: "INTRODUCCIÓN",
          clases: [
            { titulo: "1.1 ¿Qué es REST? Recursos, verbos HTTP y códigos de estado", duracion: "10min" },
            { titulo: "1.2 Entorno de trabajo: JDK, IDE y proyecto base con Spring Initializr", duracion: "12min" },
            { titulo: "1.3 Estructura del proyecto y arranque de la primera app", duracion: "8min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 2",
          clases: [
            { titulo: "2.1 Controladores REST: rutas, parámetros y respuestas JSON", duracion: "14min" },
            { titulo: "2.2 DTOs y validaciones con Bean Validation", duracion: "16min" },
            { titulo: "2.3 Manejo de errores: ResponseEntity y ControllerAdvice", duracion: "12min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 3",
          clases: [
            { titulo: "3.1 JPA/Hibernate: entidades y repositorios", duracion: "18min" },
            { titulo: "3.2 Servicios: lógica de negocio y transacciones", duracion: "15min" },
            { titulo: "3.3 Configuración de perfiles: H2 para desarrollo, PostgreSQL para producción", duracion: "12min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        }
      ]
    },
  
    "machine-learning": {
      titulo: "Modelos de Machine Learning con TensorFlow y Scikit-learn",
      imagen: "./images/curso_2.png",
      valor: "$30 USD",
      duracion: "120 hs",
      descripcion: " Aprendé el flujo completo de trabajo en Machine Learning: desde la exploración y preparación de datos hasta el entrenamiento, evaluación y tuning de modelos clásicos con Scikit-learn. Luego, vas a dar tus primeros pasos en Deep Learning con TensorFlow/Keras para construir redes neuronales densas, aplicar regularización (dropout, batch norm, early stopping) y preparar modelos para inferencia. Trabajamos con casos reales de clasificación y regresión, pipelines reproducibles y buenas prácticas para llevar tus modelos a producción inicial.",
      requisitos: " Se recomienda contar con un nivel intermedio de Python (funciones, clases y manejo de estructuras de datos), nociones básicas de álgebra y estadística, experiencia en el uso de librerías como NumPy y Pandas para la manipulación de datos, así como familiaridad con entornos de trabajo en Jupyter/Colab y control de versiones con Git. De forma opcional, resulta útil tener conocimientos en visualización de datos y fundamentos de despliegue de modelos.",
      docente: {
        nombre: "Carlos González",
        foto: "./images/carlos_gonzalez.png",
        estrellas: 4,
        bio: "Carlos González es científico de datos con más de 12 años de experiencia desarrollando soluciones de inteligencia artificial y modelos de machine learning. Actualmente trabaja en una reconocida fintech, donde lidera la implementación de modelos analíticos para detección de fraude y optimización de scoring. Además, ha dictado cursos en diversas plataformas online y colaborado en proyectos open-source orientados a la analítica de datos y la automatización de procesos."
      },
      modulos: [
        {
          titulo: "INTRODUCCIÓN",
          clases: [
            { titulo: "1.1 Introducción al Machine Learning y tipos de aprendizaje.", duracion: "60min" },
            { titulo: "1.2 Preparación de datos: limpieza, normalización y división en conjuntos.", duracion: "80min" },
            { titulo: "1.3 Métricas básicas de evaluación (accuracy, MAE, precision/recall).", duracion: "90min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 2",
          clases: [
            { titulo: "2.1 Regresión y clasificación con algoritmos clásicos (k-NN, árboles, SVM).", duracion: "45min" },
            { titulo: "2.2 Validación de modelos con pipelines y GridSearch.", duracion: "58min" },
            { titulo: "2.3 Interpretación de resultados y métricas visuales (ROC, PR).", duracion: "60min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 3",
          clases: [
            { titulo: "3.1 Creación de redes densas en Keras: capas, activaciones y pérdida.", duracion: "45min" },
            { titulo: "3.2 Entrenamiento con regularización y callbacks (dropout, early stopping).", duracion: "50min" },
            { titulo: "3.3 Guardado, carga y predicciones con modelos entrenados.", duracion: "55min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        }
      ]
    },
  
    "maquetacion-layouts": {
      titulo: "Maquetación de layouts modernos con Flexbox y CSS Grid",
      imagen: "./images/curso_3.png",
      valor: "$20 USD",
      duracion: "40 hs",
      descripcion: " Dominá la creación de interfaces modernas y responsivas con Flexbox y CSS Grid. Vas a repasar el box model y buenas prácticas de accesibilidad, aprender patrones reales (navbars, cards, galerías, dashboards) y combinar Flexbox + Grid para lograr layouts fluidos, escalables y fáciles de mantener. Incluye tips de naming, organización de CSS y estrategias para breakpoints limpios.",
      requisitos: " Conocimientos básicos de HTML semántico y CSS (selectores, propiedades y modelo de caja), manejo de media queries y unidades relativas (%, rem, fr), y familiaridad con herramientas de desarrollo del navegador (inspector y responsive mode). Se recomienda entender principios básicos de accesibilidad y organización de estilos.",
      docente: {
        nombre: "Valeria Ruiz",
        foto: "./images/valeria_ruiz.png",
        estrellas: 5,
        bio: "Valeria Ruiz es Frontend Engineer con más de 9 años construyendo interfaces y sistemas de diseño para e-commerce y fintech. Especialista en maquetación semántica, accesibilidad y performance, lideró migraciones a CSS Grid/Flexbox y capacitaciones internas en patrones responsive."
      },
      modulos: [
        {
          titulo: "INTRODUCCIÓN",
          clases: [
            { titulo: "1.1 HTML semántico, box model y flujo del documento.", duracion: "50min" },
            { titulo: "1.2 Responsive base: meta viewport, unidades relativas y media queries.", duracion: "45min" },
            { titulo: "1.3 Accesibilidad práctica: texto alternativo, orden de foco y contraste", duracion: "30min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 2",
          clases: [
            { titulo: "2.1 Contenedor flexible: direction, wrap, justify-content, align-items.", duracion: "45min" },
            { titulo: "2.2 Ítems: order, grow/shrink, basis, align-self; patrones (navbar, cards).", duracion: "40min" },
            { titulo: "2.3 Distribuciones reales: centrado, grids simples con wrap, layout de tarjetas.", duracion: "50min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 3",
          clases: [
            { titulo: "3.1 Grid básico: track sizing, fr, repeat(), gap, colocación implícita.", duracion: "55min" },
            { titulo: "3.2 Grid avanzado: grid-template-areas, auto-fit/auto-fill, minmax.", duracion: "60min" },
            { titulo: "3.3 Combinar Flexbox + Grid: landing, dashboard y secciones reutilizables.", duracion: "35min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        }
      ]
    },
  
    "pandas-numpy": {
      titulo: "Manipulación y análisis de datos con Pandas y NumPy",
      imagen: "./images/curso_4.png",
      valor: "$25 USD",
      duracion: "70 hs",
      descripcion: " Aprendé a manejar datos de forma eficiente con Pandas y NumPy, las librerías fundamentales para análisis y ciencia de datos en Python. Vas a adquirir habilidades para cargar, limpiar, transformar y analizar grandes volúmenes de información, creando reportes y visualizaciones básicas que te permitirán tomar decisiones basadas en datos.",
      requisitos: " Conocimientos básicos de Python (listas, diccionarios, funciones) y nociones de archivos CSV/Excel. Se recomienda contar con lógica de programación, interés por el análisis de datos y familiaridad con entornos como Jupyter Notebook o Google Colab. Opcionalmente, conocimientos básicos de álgebra y estadística facilitarán la comprensión de operaciones numéricas.",
      docente: {
        nombre: "Andrés López",
        foto: "./images/andres_lopez.png",
        estrellas: 4,
        bio: "Andrés López es analista de datos con más de 8 años de experiencia en proyectos de business intelligence y ciencia de datos. Ha implementado soluciones de reporting y análisis para retail y fintech, especializándose en Pandas y NumPy como herramientas principales de exploración y transformación de datos."
      },
      modulos: [
        {
          titulo: "INTRODUCCIÓN",
          clases: [
            { titulo: "1.1 Introducción a arrays: creación, dimensiones y tipos de datos.", duracion: "50min" },
            { titulo: "1.2 Operaciones vectorizadas, broadcasting y funciones universales.", duracion: "45min" },
            { titulo: "1.3 Indexación, slicing y manipulación de matrices.", duracion: "30min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 2",
          clases: [
            { titulo: "2.1 Series y DataFrames: creación y acceso a datos.", duracion: "45min" },
            { titulo: "2.2 Limpieza de datos: valores nulos, duplicados y transformación de columnas.", duracion: "40min" },
            { titulo: "2.3 Operaciones básicas: filtros, agrupamientos y funciones de agregación.", duracion: "50min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 3",
          clases: [
            { titulo: "3.1 Combinación de datasets: merge, join y concat.", duracion: "55min" },
            { titulo: "3.2 Pivot tables y análisis estadístico con Pandas.", duracion: "60min" },
            { titulo: "3.3 Exportación de resultados y visualización básica con Matplotlib.", duracion: "35min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        }
      ]
    },
  
    "pentesting": {
      titulo: "Pentesting y análisis de vulnerabilidades con Kali Linux",
      imagen: "./images/curso_5.png",
      valor: "$30 USD",
      duracion: "90 hs",
      descripcion: " Aprendé los fundamentos del pentesting y la seguridad ofensiva utilizando Kali Linux. Vas a trabajar con herramientas profesionales para escaneo de redes, enumeración de servicios, explotación de vulnerabilidades y generación de reportes. El curso te guía paso a paso en un entorno controlado para que adquieras experiencia práctica en el ciclo completo de pruebas de penetración.",
      requisitos: " Conocimientos básicos de redes (IP, puertos, protocolos) y de sistemas operativos Linux. Se recomienda manejo de la terminal, uso de máquinas virtuales y fundamentos de ciberseguridad. Opcionalmente, experiencia en programación básica (Python o Bash) ayudará en la automatización de tareas.",
      docente: {
        nombre: "Diego Fernández",
        foto: "./images/diego_fernandez.png",
        estrellas: 4,
        bio: "Diego Fernández es especialista en ciberseguridad con más de 10 años de experiencia en pruebas de penetración y análisis de vulnerabilidades. Ha trabajado en proyectos de auditoría para empresas de telecomunicaciones y banca, y es instructor de cursos de seguridad ofensiva con enfoque práctico en Kali Linux."
      },
      modulos: [
        {
          titulo: "INTRODUCCIÓN",
          clases: [
            { titulo: "1.1 Introducción al pentesting: fases, metodología y ética profesional.", duracion: "40min" },
            { titulo: "1.2 Instalación y configuración de Kali Linux en máquina virtual.", duracion: "30min" },
            { titulo: "1.3 Comandos esenciales en Linux para pentesting.", duracion: "45min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 2",
          clases: [
            { titulo: "2.1 Escaneo de redes y servicios con Nmap.", duracion: "45min" },
            { titulo: "2.2 Enumeración de vulnerabilidades con herramientas de Kali (Nikto, enum4linux).", duracion: "45min" },
            { titulo: "2.3 Explotación básica con Metasploit Framework.", duracion: "55min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 3",
          clases: [
            { titulo: "3.1 Técnicas de escalada de privilegios en Linux y Windows.", duracion: "55min" },
            { titulo: "3.2 Persistencia, movimiento lateral y extracción de información.", duracion: "40min" },
            { titulo: "3.3 Elaboración de reportes de vulnerabilidades y recomendaciones.", duracion: "45min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        }
      ]
    },
  
    "android-ios": {
      titulo: "Interfaces nativas y declarativas con Jetpack Compose (Android) y SwiftUI (iOS)",
      imagen: "./images/curso_6.png",
      valor: "$30 USD",
      duracion: "100 hs",
      descripcion: " Construí interfaces nativas modernas para Android y iOS usando los frameworks declarativos Jetpack Compose y SwiftUI. Aprendés conceptos clave como composición, estado, navegación y theming; patrones reutilizables (listas, formularios, detalle, loading/empty/error), manejo de datos asíncronos y buenas prácticas de arquitectura para apps escalables y mantenibles.",
      requisitos: " Conocimientos básicos de desarrollo móvil nativo (Kotlin para Android y/o Swift para iOS), fundamentos de programación orientada a objetos y consumo simple de APIs REST/JSON. Se recomienda manejo de Android Studio y Xcode, control de versiones con Git y nociones de patrones de arquitectura (MVVM).",
      docente: {
        nombre: "Lucía Márquez",
        foto: "./images/lucia_marquez.png",
        estrellas: 3,
        bio: "Lucía Márquez es Mobile Engineer con +7 años de experiencia construyendo apps nativas para banca y e-commerce. Lideró migraciones a Jetpack Compose y SwiftUI, definiendo guías de estilo, accesibilidad y arquitectura MVVM. Apasionada por DX, performance y patrones reutilizables."
      },
      modulos: [
        {
          titulo: "INTRODUCCIÓN",
          clases: [
            { titulo: "1.1 Paradigma declarativo: composición, previews y layout básico (Compose/SwiftUI).", duracion: "50min" },
            { titulo: "1.2 Componentes fundamentales: texto, imágenes, inputs, listas y contenedores.", duracion: "45min" },
            { titulo: "1.3 Estilos y theming: tipografías, colores, espacios, dark mode.", duracion: "30min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 2",
          clases: [
            { titulo: "2.1 Estado y reactividad: State, ViewModel, @State, @ObservedObject.", duracion: "50min" },
            { titulo: "2.2 Navegación: stacks, rutas y paso de parámetros (Navigation Compose / NavigationStack).", duracion: "55min" },
            { titulo: "2.3 Consumo de datos: llamadas asíncronas, manejo de loading/empty/error.", duracion: "45min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 3",
          clases: [
            { titulo: "3.1 MVVM en Compose/SwiftUI: capas, flujos y testabilidad.", duracion: "55min" },
            { titulo: "3.2 Listas avanzadas y rendimiento: Lazy listas, diffing, paginación básica.", duracion: "50min" },
            { titulo: "3.3 Buenas prácticas: accesibilidad, internacionalización y deploy/Store basics.", duracion: "60min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        }
      ]
    },
  
    "node-react": {
      titulo: "Desarrollo Web Full Stack con Node.js y React",
      imagen: "./images/curso_7.png",
      valor: "$35 USD",
      duracion: "150 hs",
      descripcion: " Conviértete en un desarrollador Full Stack dominando el ecosistema JavaScript. Aprenderás a construir aplicaciones web completas desde el frontend con React hasta el backend con Node.js, Express y bases de datos como MongoDB. Implementarás autenticación con JWT, manejarás APIs REST, consumirás servicios externos y desplegarás tus proyectos en la nube.",
      requisitos: " Conocimientos básicos de HTML, CSS y JavaScript. Familiaridad con Git y la línea de comandos recomendada.",
      docente: {
        nombre: "Jorge Ruiz",
        foto: "./images/jorge_ruiz.jpg",
        estrellas: 5,
        bio: "Jorge Ruiz es Desarrollador Full Stack especializado en el ecosistema JavaScript. Con más de 8 años de experiencia, ha trabajado en proyectos de frontend y backend utilizando React, Node.js, Express y bases de datos NoSQL. Actualmente se desempeña como instructor y mentor en academias de programación, ayudando a estudiantes a dar sus primeros pasos en el desarrollo web profesional."
      },
      modulos: [
        {
          titulo: "UNIDAD 1 - FUNDAMENTOS DEL DESARROLLO WEB",
          clases: [
            { titulo: "1.1 Repaso de HTML, CSS y JavaScript moderno (ES6+)", duracion: "20min" },
            { titulo: "1.2 Fundamentos del desarrollo cliente-servidor", duracion: "15min" },
            { titulo: "1.3 Introducción al stack MERN", duracion: "10min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 2 - BACKEND CON NODE.JS Y EXPRESS",
          clases: [
            { titulo: "2.1 Creación de un servidor con Express", duracion: "15min" },
            { titulo: "2.2 Rutas, middlewares y controladores", duracion: "18min" },
            { titulo: "2.3 CRUD con MongoDB y Mongoose", duracion: "20min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 3 - FRONTEND CON REACT",
          clases: [
            { titulo: "3.1 Fundamentos de React: componentes y props", duracion: "55min" },
            { titulo: "3.2 Hooks y manejo del estado", duracion: "50min" },
            { titulo: "3.3 Consumo de APIs REST desde React", duracion: "60min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        }
      ]
    },
  
    "javascript": {
      titulo: "JavaScript Avanzado: asincronía, módulos y APIs",
      imagen: "./images/curso_8.png",
      valor: "$22 USD",
      duracion: "60 hs",
      descripcion: " Lleva tu JavaScript al siguiente nivel. Dominarás asincronía (promesas, async/await y patrones para control de flujo), modularización de código (ES Modules, bundlers y buenas prácticas) y las APIs modernas del navegador y externas (Fetch, WebSockets, Service Workers y consumo de REST/GraphQL). Ideal para desarrolladores que quieren escribir código más robusto y mantenible.",
      requisitos: " Conocimientos sólidos de JavaScript (funciones, closures, objetos y promesas básicas). Familiaridad con HTML y CSS. Git y linea de comandos recomendados.",
      docente: {
        nombre: "Raul Fernandez",
        foto: "./images/raul_fernandez.jpg",
        estrellas: 4,
        bio: "Raul Fernandez es desarrollador front-end con más de 7 años de experiencia especializado en JavaScript moderno y arquitecturas web. Ha trabajado en proyectos de alto rendimiento, optimización y aplicaciones progresivas (PWA). Le apasiona enseñar buenas prácticas y patrones para construir aplicaciones robustas y mantenibles."
      },
      modulos: [
        {
          titulo: "UNIDAD 1 — ASINCRONÍA AVANZADA",
          clases: [
            { titulo: "1.1 Repaso rápido: callbacks y promesas", duracion: "15min" },
            { titulo: "1.2 Async/await: patrones y manejo de errores", duracion: "32min" },
            { titulo: "1.3 Control de concurrencia y técnicas (Promise.all, race, throttling)", duracion: "18min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 2 — MÓDULOS Y ORGANIZACIÓN DEL CÓDIGO",
          clases: [
            { titulo: "2.1 ES Modules: import / export y mejores prácticas", duracion: "45min" },
            { titulo: "2.2 Bundlers y herramientas (Webpack, Rollup, Vite) — conceptos clave", duracion: "18min" },
            { titulo: "2.3 Testing y debugging en código modular", duracion: "14min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 3 — APIS MODERNAS DEL NAVEGADOR Y CONSUMO DE SERVICIOS",
          clases: [
            { titulo: "3.1 Fetch API y manejo avanzado de peticiones", duracion: "35min" },
            { titulo: "3.2 WebSockets y comunicación en tiempo real", duracion: "40min" },
            { titulo: "3.3 Service Workers, cache y estrategias offline", duracion: "60min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        }
      ]
    },
  
    "backend": {
      titulo: "Programación Backend con Python y Django",
      imagen: "./images/curso_9.png",
      valor: "$28 USD",
      duracion: "100 hs",
      descripcion: " Aprendé a desarrollar aplicaciones web robustas y escalables con Python y Django, uno de los frameworks más potentes y utilizados en la industria. Dominarás la creación de modelos, vistas, templates, APIs REST, autenticación y despliegue de proyectos en servidores reales.",
      requisitos: " Conocimientos básicos de programación en Python, manejo de HTML y CSS. Se recomienda noción general sobre bases de datos y entornos virtuales.",
      docente: {
        nombre: "Marcelo Vieira",
        foto: "./images/marcelo_vieira.jpg",
        estrellas: 5,
        bio: "Marcelo Vieira es desarrollador backend senior con más de 10 años de experiencia en entornos Python y Django. Ha liderado equipos de desarrollo en proyectos de alto tráfico y trabaja actualmente como consultor especializado en optimización de arquitecturas web. Su enfoque docente combina práctica intensiva con ejemplos reales del mundo laboral."
      },
      modulos: [
        {
          titulo: "UNIDAD 1 — FUNDAMENTOS DE DJANGO",
          clases: [
            { titulo: "1.1 Introducción al framework Django y su arquitectura MVC", duracion: "25min" },
            { titulo: "1.2 Creación de proyectos y aplicaciones en Django", duracion: "47min" },
            { titulo: "1.3 Configuración del entorno, rutas y templates", duracion: "38min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 2 — MODELOS, ORM Y BASES DE DATOS",
          clases: [
            { titulo: "2.1 Creación de modelos y relaciones entre tablas", duracion: "42min" },
            { titulo: "2.2 Migraciones y consultas con el ORM de Django", duracion: "25min" },
            { titulo: "2.3 Administración de datos con el panel de Django Admin", duracion: "16min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 3 — DESARROLLO DE APIs Y DESPLIEGUE",
          clases: [
            { titulo: "3.1 Django REST Framework: creación de endpoints y serializadores", duracion: "20min" },
            { titulo: "3.2 Autenticación, permisos y seguridad en APIs", duracion: "22min" },
            { titulo: "3.3 Despliegue de proyectos Django en la nube (Railway, Render, etc.)", duracion: "18min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        }
      ]
    },
  
    "react-native": {
      titulo: "Desarrollo de aplicaciones móviles con React Native",
      imagen: "./images/curso_10.png",
      valor: "$30 USD",
      duracion: "90 hs",
      descripcion: " Aprendé a crear aplicaciones móviles nativas para Android e iOS utilizando React Native, el framework de JavaScript más popular para desarrollo multiplataforma. Dominarás componentes, navegación, manejo de estado, conexión con APIs y publicación en tiendas de aplicaciones.",
      requisitos: " Conocimientos básicos de JavaScript y React. Se recomienda experiencia previa con HTML, CSS y nociones de programación orientada a componentes.",
      docente: {
        nombre: "Rosa Sanchez",
        foto: "./images/rosa_sanchez.jpg",
        estrellas: 3,
        bio: "Rosa Sanchez es desarrolladora mobile full stack con más de 8 años de experiencia en React Native y ecosistemas JavaScript. Ha trabajado en startups y empresas internacionales, liderando proyectos de aplicaciones multiplataforma de alto rendimiento. Es una apasionada del desarrollo ágil y la enseñanza práctica, enfocada en la creación de experiencias móviles fluidas e intuitivas."
      },
      modulos: [
        {
          titulo: "UNIDAD 1 — INTRODUCCIÓN A REACT NATIVE",
          clases: [
            { titulo: "1.1 Instalación del entorno (Node.js, Expo, Android Studio)", duracion: "18min" },
            { titulo: "1.2 Estructura básica de un proyecto React Native", duracion: "27min" },
            { titulo: "1.3 Componentes principales y estilos con StyleSheet", duracion: "48min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 2 — NAVEGACIÓN Y GESTIÓN DE ESTADO",
          clases: [
            { titulo: "2.1 React Navigation: Stack, Tabs y Drawer Navigators", duracion: "52min" },
            { titulo: "2.2 Manejo de estado con Context API y Redux Toolkit", duracion: "25min" },
            { titulo: "2.3 Hooks avanzados y optimización del rendimiento", duracion: "26min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 3 — APIs, ALMACENAMIENTO Y PUBLICACIÓN",
          clases: [
            { titulo: "3.1 Conexión con APIs REST y GraphQL", duracion: "50min" },
            { titulo: "3.2 Manejo de almacenamiento local (AsyncStorage, SQLite, Realm)", duracion: "32min" },
            { titulo: "3.3 Publicación en Google Play y App Store con Expo y EAS Build", duracion: "28min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        }
      ]
    },
  
    "maquetacion-css": {
      titulo: "Maquetación avanzada con animaciones y transiciones CSS",
      imagen: "./images/curso_11.png",
      valor: "$18 USD",
      duracion: "50 hs",
      descripcion: " Dominá las técnicas avanzadas de maquetación con CSS Grid y Flexbox, y llevá tus interfaces al siguiente nivel aplicando animaciones, transiciones y efectos visuales modernos. Aprendé a crear experiencias de usuario dinámicas, fluidas y profesionales sin necesidad de JavaScript.",
      requisitos: " Conocimientos intermedios de HTML y CSS. Se recomienda experiencia básica en diseño responsivo y maquetación web.",
      docente: {
        nombre: "Mercedes Sosa",
        foto: "./images/mercedes_sosa.jpg",
        estrellas: 5,
        bio: "Mercedes Sosa es diseñadora front-end con más de 9 años de experiencia en maquetación web y animaciones CSS. Ha trabajado en agencias de diseño digital y estudios creativos, donde perfeccionó su dominio de las transiciones y efectos visuales modernos. Su enfoque combina precisión técnica con una fuerte sensibilidad estética orientada a la experiencia del usuario."
      },
      modulos: [
        {
          titulo: "UNIDAD 1 — MAQUETACIÓN AVANZADA",
          clases: [
            { titulo: "1.1 Revisión avanzada de Flexbox y Grid Layout", duracion: "18min" },
            { titulo: "1.2 Layouts complejos y responsive design avanzado", duracion: "20min" },
            { titulo: "1.3 Uso de variables CSS y custom properties", duracion: "15min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 2 — TRANSICIONES Y ANIMACIONES",
          clases: [
            { titulo: "2.1 Transiciones CSS: propiedades, tiempos y funciones de easing", duracion: "22min" },
            { titulo: "2.2 Animaciones con keyframes y transformaciones 2D/3D", duracion: "35min" },
            { titulo: "2.3 Animaciones complejas: delays, loops y sincronización", duracion: "46min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 3 — EFECTOS AVANZADOS Y OPTIMIZACIÓN",
          clases: [
            { titulo: "3.1 Creación de efectos de scroll, parallax y microinteracciones", duracion: "57min" },
            { titulo: "3.2 Uso de filtros, sombras y blend modes para efectos visuales", duracion: "36min" },
            { titulo: "3.3 Optimización del rendimiento y buenas prácticas en animaciones", duracion: "25min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        }
      ]
    },
  
    "nosql": {
      titulo: "Bases de datos relacionales y NoSQL con MySQL y MongoDB",
      imagen: "./images/curso_12.png",
      valor: "$27 USD",
      duracion: "110 hs",
      descripcion: " Aprendé a diseñar, crear y optimizar bases de datos utilizando MySQL y MongoDB. Este curso cubre desde modelado relacional y consultas SQL avanzadas hasta bases NoSQL, agregaciones, índices y estrategias de integración para aplicaciones modernas, asegurando un manejo de datos eficiente y escalable.",
      requisitos: " Conocimientos básicos de programación, familiaridad con SQL y conceptos fundamentales de estructuras de datos. Experiencia con cualquier lenguaje de programación recomendada.",
      docente: {
        nombre: "Elsa Pallo",
        foto: "./images/elsa_pallo.jpg",
        estrellas: 4,
        bio: "Elsa Pallo es Ingeniera en Sistemas con más de 10 años de experiencia en diseño, administración y optimización de bases de datos. Especialista en arquitecturas híbridas y en la integración de sistemas SQL y NoSQL para aplicaciones modernas."
      },
      modulos: [
        {
          titulo: "UNIDAD 1 — BASES DE DATOS RELACIONALES",
          clases: [
            { titulo: "1.1 Introducción a bases de datos relacionales y modelado ER", duracion: "17min" },
            { titulo: "1.2 SQL básico y avanzado: SELECT, JOINs, subconsultas", duracion: "26min" },
            { titulo: "1.3 Optimización, índices y normalización de bases relacionales", duracion: "15min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 2 — BASES DE DATOS NoSQL",
          clases: [
            { titulo: "2.1 Introducción a MongoDB y su modelo de documentos", duracion: "27min" },
            { titulo: "2.2 Operaciones CRUD, índices y agregaciones", duracion: "37min" },
            { titulo: "2.3 Estrategias de diseño y escalabilidad en NoSQL", duracion: "47min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        },
        {
          titulo: "UNIDAD 3 — INTEGRACIÓN Y CASOS PRÁCTICOS",
          clases: [
            { titulo: "3.1 Integración de MySQL y MongoDB en aplicaciones", duracion: "60min" },
            { titulo: "3.2 Estrategias híbridas y sincronización de datos", duracion: "60min" },
            { titulo: "3.3 Buenas prácticas, seguridad y respaldo de datos", duracion: "60min" },
            { titulo: "EXAMEN", duracion: "40min" }
          ]
        }
      ]
    },
  };