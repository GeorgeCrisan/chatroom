'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const server = app.listen(8000, ()=>{
    console.log( 'server started'); 
});

const serverio = require('socket.io').listen(server);

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
  
app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html');
});

serverio.sockets.on('connection', function(socket){
    console.log( ' user connected ');
    socket.on('message', (msg)=>{
        console.log(msg);
        serverio.emit('message', msg);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
});
