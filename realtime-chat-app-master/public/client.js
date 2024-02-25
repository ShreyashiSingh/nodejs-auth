const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    name = prompt('Please enter your name: ')
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})
//Sends a message to the server when the user presses 'Enter' in the textarea.
// It creates a message object containing the user's name and the message content
function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append appends the message to the message area as an outgoing message,
    // clears the textarea, and scrolls to the bottom of the message area.
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server...it emits the message to the server using the 'message' event.
    socket.emit('message', msg)

}
//Appends a message to the message area

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages...Listens for incoming messages from the server. When a message is received, 
//it appends the message to the message area as an incoming message and scrolls to the bottom of the message area
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})
// Scrolls the message area to the bottom. 
//This function is called whenever a new message is sent or received to ensure the latest message is always visible.
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}



