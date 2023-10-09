const express = require('express')
const app = express()
const http = require('http').createServer(app)
const socketIo = require('socket.io')

const io = socketIo(http);

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/board.html')
})

app.get('/admin',(req,res)=>{
    res.sendFile(__dirname+'/public/admin.html')
})

io.on('connection',(socket)=>{
    console.log("new connection extablished");

    socket.on('disconnect',()=>{
        console.log('conection closed');
    })

    socket.on('message',(msg)=>{
        console.log(msg);
        io.emit('board_content',msg)
    })
})


http.listen(4000,()=>{
    console.log("connected to server...");
})