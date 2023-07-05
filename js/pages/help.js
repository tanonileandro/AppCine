// Configuración de EmailJS
(function() {
  emailjs.init('LYZl281jsaB6EaTu9w4Va'); // Reemplaza 'YOUR_USER_ID' por tu ID de usuario de EmailJS
})();

// Capturar el evento de envío del formulario
document.getElementById('form-cine_contacto').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el comportamiento de envío predeterminado del formulario

  // Obtener los datos del formulario
  var nombre = document.getElementById('nombre').value;
  var email = document.getElementById('email').value;
  var mensaje = document.getElementById('mensaje').value;

  // Envío del email mediante EmailJS
  var templateParams = {
    from_name: nombre,
    to_name: 'Tanoni Leandro', //  nombre del destinatario del email
    message: mensaje,
    reply_to: email
  };

  emailjs.send('service_g1fd4ra', 'template_r157wdr', templateParams)
  .then(function(response) {
    mostrarMensaje('msuccess-message'); // Llamada a mostrarMensaje sin texto adicional
  }, function(error) {
    mostrarMensaje('error-message'); // Llamada a mostrarMensaje sin texto adicional
  });

  // Limpia los campos del formulario
  document.getElementById('nombre').value = '';
  document.getElementById('email').value = '';
  document.getElementById('mensaje').value = '';
});

