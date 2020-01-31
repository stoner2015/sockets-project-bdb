//Funciones para renderizar usuarios
var params = new URLSearchParams(window.location.search);
var nombre = params.get('nombre');
var sala = params.get('sala');


//referencias de Jquery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');

function renderizarUsuarios(personas) {
    console.log(personas);

    var html = '';

    html += '<li>';
    html += '   <a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>';
    html += '</li>'


    for (var i = 0; i < personas.length; i++) {;
        html += '<li>';
        html += '    <a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/' + personas[i].avatar + '.png" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + '<small class="text-success">online</small></span></a>';
        html += '</li>'
    }

    divUsuarios.html(html);

}

function renderizarMensajes(mensaje, me) {
    var htmlMensaje = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';
    if (mensaje.nombre === 'Administrador') {
        adminClass = 'danger';
    }

    if (me) {
        htmlMensaje += '<li class="reverse">';
        htmlMensaje += '    <div class="chat-content">';
        htmlMensaje += '        <h5>' + mensaje.nombre + '</h5>';
        htmlMensaje += '        <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        htmlMensaje += '    </div>';
        htmlMensaje += '    <div class="chat-img"><img src="assets/images/users/' + mensaje.avatar + '.png" alt="user" /></div>';
        htmlMensaje += '    <div class="chat-time">' + hora + '</div>';
        htmlMensaje += '</li>';
    } else {
        htmlMensaje += '<li class="animated fadeIn">';
        if (mensaje.nombre !== 'Administrador') {
            htmlMensaje += '    <div class="chat-img"><img src="assets/images/users/' + mensaje.avatar + '.png" alt="user" /></div>';
        }

        htmlMensaje += '    <div class="chat-content">';
        htmlMensaje += '        <h5>' + mensaje.nombre + '</h5>'
        htmlMensaje += '        <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
        htmlMensaje += '    </div>';
        htmlMensaje += '    <div class="chat-time">' + hora + '</div>';
        htmlMensaje += '</li>';
    }

    divChatbox.append(htmlMensaje);

}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

//listeners en Jquery
divUsuarios.on('click', 'a', function() {
    var id = $(this).data('id');
    if (id) {
        console.log(id);
    }

});
formEnviar.on('submit', function(e) {
    e.preventDefault();
    // console.log(`que paso no funciona ${txtMensaje.val()}`);
    if (txtMensaje.val().trim().lenght === 0) {
        return;
    }
    //emit Enviar informacion
    // console.log(`chanfle ${txtMensaje.val()}`);
    socket.emit('enviarMensaje', {
        usuario: nombre,
        mensaje: txtMensaje.val(),
        avatar: 'u10'
    }, function(mensaje) {
        // console.log('respuesta del servidor:', mensaje);
        txtMensaje.val('').focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();
    });

});