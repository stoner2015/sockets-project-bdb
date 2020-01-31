const crearMensaje = (nombre, mensaje, avatar) => {
    return {
        nombre,
        mensaje,
        avatar,
        fecha: new Date().getTime()
    };
}

module.exports = {
    crearMensaje
}