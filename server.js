//Load HTTP module
const express = require('express');
const app = express();

const server = require('http').createServer(app)
const io = require('socket.io').listen(server);

const mongo = require('./services/mongo')

var users = [];
var connections = [];

server.listen(process.env.PORT || 4500)
console.log("server running")

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
});

io.sockets.on('connection', function(socket) {
  connections.push(socket)
  console.log('connected: %s sockets connected', connections.length)

  // Disconnect
  socket.on('disconnect', function(data){
    connections.splice(connections.indexOf(socket), 1);
    console.log("Disconnected: %s sockets connected", connections.length);
  })


  // add vocab
  socket.on('add vocab', function(data) {
    mongo.connect(function(db){
      mongo.insertDocuments(db, 'tracks', data)
      io.sockets.emit('new vocab', {msg: data})
    })
  })

  // find vocab with artist name
  socket.on('find vocabs', function(artist) {
    mongo.connect(function(db){
      mongo.findDocuments(db, 'tracks', function(data) {
        io.sockets.emit('vocabs found', {msg: data})

      })
    })
  })
  // add artist
  socket.on('add artist', function(data) {
    mongo.connect(function(db){
      mongo.insertDocuments(db, 'artists', data)
      io.sockets.emit('new artist', {msg: data})
    })
  })


  // find artist
  socket.on('find artists', function(d) {
    mongo.connect(function(db){
      mongo.findDocuments(db, 'artists', function(data) {
        io.sockets.emit('artists found', {msg: data})
      })
    })
  })
})