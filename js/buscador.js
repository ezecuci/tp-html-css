document.addEventListener('DOMContentLoaded', () => {
const todosLosCursos = [];
let indice = 0;
for (let idCurso in CURSOS) {
  const c = CURSOS[idCurso];
  todosLosCursos.push({
    id: indice,
    descripcion: c.titulo,
    enlace: `./detalle-curso.html?id=${idCurso}`
  });
  indice++;
}

const inputBusqueda = document.querySelector('input[name="buscador"]');
const listaSugerencias = document.getElementById('busqueda');

function actualizarSugerencias(texto) {
  const q = (texto || '').trim().toLowerCase();
  listaSugerencias.innerHTML = '';
  let resultados = todosLosCursos;
  if (q !== '') {
    resultados = todosLosCursos.filter(c =>
      c.descripcion.toLowerCase().includes(q)
    );
  }

  resultados.slice(0, 5).forEach(curso => {
    const option = document.createElement('option');
    option.value = curso.descripcion;
    listaSugerencias.appendChild(option);
  });
}

function encontarLoBuscado() {
  const texto = inputBusqueda.value.trim().toLowerCase();

  const curso = todosLosCursos.find(c => 
    c.descripcion.toLowerCase().includes(texto)
  );
  
  if (curso) {
    window.location.href = curso.enlace;
  }
}

inputBusqueda.addEventListener('input', () => actualizarSugerencias(inputBusqueda.value));
inputBusqueda.addEventListener('change', encontarLoBuscado);

actualizarSugerencias('');
});