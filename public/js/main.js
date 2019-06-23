const socket = io.connect('http://localhost:8080', {'forceNew': true})

// IDEA: de esta manera accedemos a los mensajes en el servidor
socket.on('messages', (data) => {
  console.log(data)
  render2(data)
})

// IDEA: esta function se encarga de renderizar la colección de mensajes
function render2(data) {
  let html = data.map((elem,index) => {
    localStorage.setItem('socketId', elem.socketId)
    return(`<div>
              <strong>${elem.author}</strong>:
              ${elem.text}
            </div>`)
  // IDEA: el join es para que los elementos del arrray se separen por espacio y no por ','
  }).join(' ')
  // IDEA: agrego mensajes al dom
  document.getElementById('messages').innerHTML = html
  // IDEA: limpio el input de mensaje
  document.getElementById('text').value = ''
}

function render(data) {
  let html = data.map((elem,index) => {
    return(`<div>
              <strong>${elem.author}</strong>:
              ${elem.text}
            </div>`)
  // IDEA: el join es para que los elementos del arrray se separen por espacio y no por ','
  }).join(' ')
  // IDEA: agrego mensajes al dom
  document.getElementById('messages').innerHTML = html
  // IDEA: limpio el input de mensaje
  document.getElementById('text').value = ''
}

// IDEA: esta function envia el mensaje al servidor
function addMessage(e) {
  let payload = {
    socketId: localStorage.getItem('socketId'),
    author: document.getElementById('nick').value,
    text: document.getElementById('text').value,
  }

  socket.emit('new-message', payload)
  return false
}
