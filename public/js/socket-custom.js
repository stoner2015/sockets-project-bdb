var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son obligatorios');
}


var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

//on para escuchar información
socket.on('connect', function() {

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados al chat', resp);
    });

    console.log('conectado al servidor ...');
});

socket.on('disconnect', function() {
    console.log('perdimos la conexion con el servidor...');
});

//emit Enviar informacion
socket.emit('enviarMensaje', {
    // usuario: 'Javier',
    mensaje: 'Hola mundo'
}, function(respuesta) {
    console.log('respuesta del servidor:', respuesta);
});




socket.on('enviarMensaje', function(mensaje) {
    console.log('servidor:', mensaje);
});

socket.on('listaPersona', function(usuarios) {
    console.log(usuarios);
});


//mensajes privados
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje privado', mensaje);
});