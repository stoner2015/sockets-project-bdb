const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utils/utilidates');

const usuarios = new Usuarios();

io.on('connect', (cliente) => {
    console.log("usuario conectando al chat ...");
    cliente.on('entrarChat', (data, callback) => {
        console.log(data);
        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre y la sala son necesarios'
            });
        }

        cliente.join(data.sala);

        let personas = usuarios.agregarPersona(cliente.id, data.nombre, data.sala);
        // console.log(`cliente: ${cliente.id} nombre=${data.nombre} ${personas}`);

        cliente.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));
        cliente.broadcast.to(data.sala).emit('enviarMensaje', crearMensaje('Administrador', `${data.nombre} ingreso al chat del banco`, ));

        callback(usuarios.getPersonasPorSala(data.sala));
    })

    cliente.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(cliente.id);
        cliente.broadcast.to(personaBorrada.sala).emit('enviarMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salio del chat del banco`, ));
        cliente.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));
        console.log('usuario desconectado');
    });

    // //escuchar el cliente
    cliente.on('enviarMensaje', (data, callback) => {
        let persona = usuarios.getPersona(cliente.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        cliente.broadcast.to(persona.sala).emit('enviarMensaje', mensaje);

        callback(mensaje);
    });

    //mensajes privados
    cliente.on('mensajePrivado', data => {
        let persona = usuarios.getPersona(cliente.id);
        cliente.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    })


});