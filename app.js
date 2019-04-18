const express = require('express')
const app = express()
const cors = require('cors')

const port = process.env.PORT || 4000

const server = require('http').Server(app)
var io = require('socket.io')(server)

app.use(cors())

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

server.listen(port)

app.use(express.static(__dirname + '/public'))

io.on('connection', function(socket) {
    console.log('hello from server')
    socket.emit('notification', {
        message: 'hello'
    })

    socket.on('slide', function(data) {
        io.emit('slideshow', data);
    })
})