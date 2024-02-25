const express = require('express')
const app = express()
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

// Defines a route for the root URL '/'. It sends the index.html file when this route is accessed.
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
//Integrates Socket.io with the HTTP server.
const io = require('socket.io')(http)

//: Listens for socket connections. 
//When a client connects, it logs a message to the console.
// It also listens for the 'message' event from clients and broadcasts the received message to all other connected clients.
io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})