const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
let messages = [{
  id: 1,
  text: 'Hola, soy un mensaje!',
  author: 'Administrador'
}]
// IDEA: aqui seteamos public como directorio de acceso a los clientes
app.use(express.static('public'))
// IDEA: este get es una prueba de rutas rest con un msj de bienvenida
app.get('/hi', (req, res) => {
  res.status(200).send('Hola, bienvenido!')
})
// IDEA: aqui iniciamos conexion, esperamos accesos de clientes
io.on('connection', (socket) => {
  console.log('alguien se ha conectado...');
  // IDEA: emitimos un mensaje al cliente nuevo
  socket.emit('messages', messages)
  // IDEA: escuchamos evento new-message que envia el cliente
  socket.on('new-message', (data) => {
    messages.push(data)
    // IDEA: que envia a todos los clientes los mensajes
    io.sockets.emit('messages', messages)
  })
})
// IDEA: inicia el servidor y queda a la espera de conexiones
server.listen(8080, function() {
  console.log('Servidor sockets corriendo en htt://localhost:8080');
})
