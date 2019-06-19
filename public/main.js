const socket = io.connect('http://localhost:8080', {'forceNew': true})

// IDEA: de esta manera accedemos a los mensajes en el servidor
socket.on('messages', (data) => {
  console.log(data)
  render(data)
})

// IDEA: esta function se encarga de renderizar la colección de mensajes
function render(data) {
  let html = data.map((elem,index) => {
    return(`<div>
              <strong>${elem.author}</strong>:
              ${elem.text}
            </div>`)
  }).join(' ')//para que los elementos del arrray se separen por espacio y no por ','

  document.getElementById('messages').innerHTML = html
}

// IDEA: esta function envia el mensaje al servidor
function addMessage(e) {
  let payload = {
    author: document.getElementById('nick').value,
    text: document.getElementById('text').value,
  }

  socket.emit('new-message', payload)
  return false
}
