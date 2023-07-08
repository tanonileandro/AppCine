// Configuración de EmailJS
(function () {
  emailjs.init('xOMj-4vy1S6yjqLsV');
})();

// Capturar el evento de envío del formulario
document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault(); // Evita el comportamiento de envío predeterminado del formulario

  // Obtener los datos del formulario
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const mensaje = document.getElementById('mensaje').value;

  // Validar que los campos estén rellenados
  if (nombre.trim() === '' || email.trim() === '' || mensaje.trim() === '') {
    mostrarMensaje('warning-message')
    return; // Detener la ejecución si hay campos vacíos
  }
  // Envío del email mediante EmailJS
  const templateParams = {
    from_name: nombre,
    to_name: 'Tanoni Leandro', //  nombre del destinatario del email
    message: mensaje,
    reply_to: email
  };

  emailjs.send('service_g1fd4ra', 'template_r157wdr', templateParams)
    .then(function (response) {
      mostrarMensaje('msuccess-message', response); // Llamada a mostrarMensaje
    }, function (error) {
      mostrarMensaje('error-message', error); // Llamada a mostrarMensaje 
    });

  // Limpia los campos del formulario
  document.getElementById('nombre').value = '';
  document.getElementById('email').value = '';
  document.getElementById('mensaje').value = '';
});

