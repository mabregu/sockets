const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

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
  let messages = [{
    id: socket.id,
    text: 'Hola! Como estas? Soy un bot!',
    author: 'Bot'
  }]

  socket.emit('messages', messages)
  // IDEA: escuchamos evento new-message que envia el cliente
  socket.on('new-message', (data) => {
    data['socketId'] = socket.id
    messages.push(data)
    messages.push(talk(data))
    //io.sockets.emit('messages', messages)
    io.sockets.to(data.socketId).emit('messages', messages);
  })
})

function talk(data) {
  let msj = 'msj'

  if (data.text.includes('Hola'))
    msj = 'Todo bien?'
  else if (data.text.includes('i nombre'))
    msj = 'Igual que mi creador! jajaj'
  else if (data.text.includes('AR2D2') || data.text.includes('ar2d2'))
    msj = 'Si! como ese crack! jaja'
  else if (data.text.includes('odo bien'))
    msj = 'Genial! por aqui también'
  else if (data.text.includes('u nombre'))
    msj = 'Mi nombre es Tucumán, pero me podes decir Bot. XD'
  else if (data.text.includes('ajaj'))
    msj = 'Jajaj XD'
  else {
    msj = 'No te entiendo amigo'
  }

  let talk = {
    id: data.id,
    author: 'Bot',
    text: msj
  }

  return talk
}

// IDEA: inicia el servidor y queda a la espera de conexiones
server.listen(8080, function() {
  console.log('Servidor sockets corriendo en http://localhost:8080');
})
