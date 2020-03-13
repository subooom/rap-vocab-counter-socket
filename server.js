var express = require('express');
var app = express();
var server = require('http').createServer();
var io = require('socket.io').listen(server);

users = [];
connections = [];


server.listen(process.env.PORT || 3000);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
})