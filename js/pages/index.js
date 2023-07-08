// Contador de página
let paginaActual = 1;

// Crear la cartelera en el HTML
async function crearCartelera(pagina) {
    const carteleraPeliculas = document.getElementById('sec_peliculas');

    // Mostrar el aviso de carga
    cargandoPagina();

    try {
        const resultados = await obtenerAPI(pagina);

        setTimeout(() => {
            // Ocultar el aviso de carga después de 1 segundo
            ocultarCargandoPagina();

            carteleraPeliculas.innerHTML = ''; // Limpiar el contenido actual de la cartelera

            for (const pelicula of resultados) {
                const { poster_path, title, id, original_title, original_language, release_date } = pelicula;

                const contenedor = document.createElement('div');
                contenedor.classList.add('contenedorPeliculas');
                contenedor.innerHTML = `
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${poster_path}">
                    <h3 class="titulo">${title}</h3>
                    <p><b>Código:</b> <span class="codigo">${id}</span><br><br>
                    <b>Título original:</b> ${original_title}<br>
                    <b>Idioma original:</b> ${original_language}<br>
                    <b>Año:</b> ${release_date}<br>
                    <div class="button-fav">
                        <button class="button radius medium agregar-fav">Agregar a Favoritos</button>
                    </div>`;

                carteleraPeliculas.appendChild(contenedor);
            }
        }, 1000);
    } catch (error) {
        console.error('Error:', error);
        // Ocultar el aviso de carga en caso de error
        ocultarCargandoPagina();
    }
}


// Agregar películas a favoritos por código
async function agregarPeliculaPorCodigo(codigo) {
    const favoritos = JSON.parse(localStorage.getItem('FAVORITOS')) || [];

    if (favoritos.some(pelicula => pelicula.id === codigo)) {
        mostrarMensaje('warning-message');
        return;
    }

    try {
        const resultados = await obtenerAPI(paginaActual); // Pasar el número de página actual
        const peliculaExistente = resultados.find(pelicula => pelicula.id === codigo);

        if (!peliculaExistente) {
            mostrarMensaje('error-message');
            return;
        }

        favoritos.push(peliculaExistente);
        localStorage.setItem('FAVORITOS', JSON.stringify(favoritos));
        mostrarMensaje('success-message');
    } catch (error) {
        console.error('Error:', error);
    }
}

// Agregar películas a favoritos por botón
function agregarPeliculaDesdeBoton(event) {
    if (event.target.classList.contains('agregar-fav')) {
        const tarjeta = event.target.closest('.contenedorPeliculas');
        const codigo = parseInt(tarjeta.querySelector('.codigo').textContent);
        agregarPeliculaPorCodigo(codigo);
    }
}

//  Evento submit-formulario para agregar películas por código
const formFavoritos = document.querySelector('.form-favoritos');
formFavoritos.addEventListener('submit', async event => {
    event.preventDefault();
    const codigoInput = document.getElementById('movie-title');
    const codigo = parseInt(codigoInput.value.trim());
    await agregarPeliculaPorCodigo(codigo);
    codigoInput.value = '';
});

// Evento de clic al botón "Siguiente"
const btnSiguiente = document.getElementById('btnSiguiente');
btnSiguiente.addEventListener('click', () => {
    paginaActual++;
    crearCartelera(paginaActual);
});

// Evento de clic al botón "Anterior"
const btnAnterior = document.getElementById('btnAnterior');
btnAnterior.addEventListener('click', () => {
    if (paginaActual > 1) {
        paginaActual--;
        crearCartelera(paginaActual);
    }
});

// Obtener cartelera peliculas
const carteleraPeliculas = document.querySelector('.sec_peliculas');

// Evento boton "Agregar a Favoritos"
carteleraPeliculas.addEventListener('click', agregarPeliculaDesdeBoton);

// Inicializar la creación de la cartelera en la página 1
crearCartelera(paginaActual);

