exports = module.exports = function(socket,io){
    socket.on('hi', function(msg){
        console.log("el cliente manda el siguient emensaje",msg);
        socket.emit('hi',"Respuesta del servidor a mensaje " + msg);
    });

    setInterval(()=>{
        io.emit('hi',"hola ya son las "+(new Date()).toUTCString())
    }, 8000);

}