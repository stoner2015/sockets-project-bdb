var socket = io();

//on para escuchar información
socket.on('connect', function() {
    console.log('conectado al servidor ...');
});

socket.on('disconnect', function() {
    console.log('perdimos la conexion con el servidor...');
});

//emit Enviar informacion
socket.emit('enviarMensaje', {
    usuario: 'Javier',
    mensaje: 'Hola mundo'
}, function(respuesta) {
    console.log('respuesta del servidor:', respuesta);
});


socket.on('enviarMensaje', function(mensaje) {
    console.log('servidor:', mensaje);
});