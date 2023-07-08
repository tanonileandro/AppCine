(function () {
  emailjs.init('xOMj-4vy1S6yjqLsV');
})();

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtener los valores del formulario
  const name = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('mensaje').value;

  // Validar que los campos estén rellenados
  if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
      mostrarMensaje('warning-message');
      return; // Detener la ejecución si hay campos vacíos
  }

  // Enviar el correo electrónico
  emailjs.send('service_g1fd4ra', 'template_r157wdr', {
      from_name: name,
      from_email: email,
      message: message
  })
    .then(function (response) {
      mostrarMensaje('msuccess-message', response); // Llamada a mostrarMensaje
    }, function (error) {
      mostrarMensaje('error-message', error); // Llamada a mostrarMensaje 
    });
});

