// borrarDatosAntiguos();
// mostrarPeliculasFav();

// Obtener las películas favoritas almacenadas en localStorage
function obtenerPeliculasFav() {
    return JSON.parse(localStorage.getItem('FAVORITOS')) || [];
}

// Mostrar las películas favoritas en el HTML
function mostrarPeliculasFav() {
    const peliculasFav = obtenerPeliculasFav();
    const contenedorFav = document.getElementById('contenedorPeliculasFavoritas');
    const messageNoMovies = document.getElementById('message-no-movies');
    const errorMessage = document.getElementById('error-message');

    // Limpiar el contenido actual del contenedor
    contenedorFav.innerHTML = '';

    if (peliculasFav.length === 0) {
        // Mostrar mensaje de falta de películas
        messageNoMovies.style.display = 'block';
        errorMessage.style.display = 'none';

    } else {
        // Mostrar el aviso de carga
        cargandoPagina();

        obtenerAPI() // Obtener todas las películas sin especificar la página
            .then(resultados => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(resultados);
                    }, 1000);
                });
            })
            .then(resultados => {
                // Ocultar el aviso de carga
                ocultarCargandoPagina();

                for (const pelicula of peliculasFav) {
                    const { poster_path, title, id, original_title, original_language, release_date, overview } = pelicula;

                    const contenedor = document.createElement('div');
                    contenedor.classList.add('contenedorPeliculafav');
                    contenedor.innerHTML = `
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${poster_path}">
                        <h3 class="titulo">${title}</h3>
                        <p><b>Código:</b> <span class="codigo">${id}</span><br><br>
                        <b>Título original:</b> ${original_title}<br>
                        <b>Idioma original:</b> ${original_language}<br>
                        <b>Año:</b> ${release_date}<br>
                        <b>Resumen:</b> ${overview}<br>
                        <div class="video-container"></div>
                        <div class="button-fav">
                            <button class="button radius medium eliminar-fav">Eliminar de Favoritos</button> 
                        </div>`;

                    contenedorFav.appendChild(contenedor);
                    videoPelicula(id, contenedor.querySelector('.video-container'));
                }
            })
            .catch(error => {
                // Mostrar mensaje de error
                messageNoMovies.style.display = 'none';
                errorMessage.style.display = 'block';
            });

        messageNoMovies.style.display = 'none';
        errorMessage.style.display = 'none';
    }
}

// Agregar video de la película
async function videoPelicula(codigo, contenedorVideo) {
    const apiKey = '9ea99f4dda3810d7ea7311056edcc000';
    const videoUrl = `https://api.themoviedb.org/3/movie/${codigo}/videos?api_key=${apiKey}`;

    try {
        const response = await fetch(videoUrl);
        const data = await response.json();
        const video = data.results[0];

        if (video) {
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${video.key}`;
            contenedorVideo.appendChild(iframe);
        }
    } catch (error) {
        console.error('Error al obtener el video:', error);
    }
}

// Eliminar una película de la lista de favoritos
function eliminarPeliculaFav(codigo) {
    const peliculasFav = obtenerPeliculasFav();
    const indice = peliculasFav.findIndex(pelicula => pelicula.id === codigo);

    if (indice !== -1) {
        peliculasFav.splice(indice, 1);
        localStorage.setItem('FAVORITOS', JSON.stringify(peliculasFav));
        mostrarPeliculasFav(); // Actualizar la lista de películas favoritas con la página actual
    }
}

// Evento boton "Eliminar de Favoritos"
const contenedorFav = document.getElementById('contenedorPeliculasFavoritas');
contenedorFav.addEventListener('click', (event) => {
    if (event.target.classList.contains('eliminar-fav')) {
        const contenedor = event.target.closest('.contenedorPeliculafav');
        const codigo = parseInt(contenedor.querySelector('.codigo').textContent);
        eliminarPeliculaFav(codigo);
    }
});

// Mostrar las películas favoritas
mostrarPeliculasFav();

// function borrarDatosAntiguos() {
//     localStorage.removeItem('FAVORITOS');
//   }
