const { io } = require('../server');

io.on('connection', (cliente) => {
    console.log("usuario conectando");


    cliente.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a la aplicacion de chat de Javier'
    });

    cliente.on('disconnect', () => {
        console.log('usuario desconectado');
    });

    //escuchar el cliente
    cliente.on('enviarMensaje', (data, callback) => {
        console.log(data);

        cliente.broadcast.emit('enviarMensaje', data);


        // if (mensaje.usuario) {
        //     callback({
        //         resp: 'TODO VA A SALIR BIEN'
        //     });
        // } else {
        //     callback({
        //         resp: 'TODO VA A SALIR MAL'
        //     });
        // }
    });


});