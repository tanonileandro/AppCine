const API_KEY = '9ea99f4dda3810d7ea7311056edcc000';
const LANGUAGE = 'es-ES';

async function obtenerAPI(page) {
  try {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}&page=${page}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Error al obtener los datos de la API');
    }

    const data = await response.json();
    totalPages = data.total_pages; // Actualizar el número total de páginas disponibles

    return data.results;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Mostrar el aviso de carga
function cargandoPagina() {
  const cargando = document.getElementById('loading-page');
  cargando.style.display = 'block';
}

// Ocultar el aviso de carga
function ocultarCargandoPagina() {
  const cargando = document.getElementById('loading-page');
  cargando.style.display = 'none';
}

// Mensajes de avisos
function mostrarMensaje(idMensaje) {
  const mensaje = document.getElementById(idMensaje);
  mensaje.style.display = 'block';
  setTimeout(() => {
    mensaje.style.display = 'none';
  }, 3000);
}




