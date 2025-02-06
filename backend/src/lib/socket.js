import {Server} from 'socket.io'
import http from 'http'
import express from 'express'
const app=express()
const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:['http://localhost:5173']
    }
})

export function getReceiverSoketId(userId){
return usersSoketMap[userId]
}
//online users store
const usersSoketMap={}
io.on('connection',(socket)=>{
    console.log('A user connect',socket.id)
    const userId=socket.handshake.query.userID;
    
    if(userId){
         usersSoketMap[userId]=socket.id        
    }
  
    // io.emit used to send event to all connected events
    io.emit('getOnlineUsers',Object.keys(usersSoketMap))
    socket.on('disconnect',()=>{
        console.log('A user disconnect',socket.id)
        delete usersSoketMap[userId]
        io.emit('getOnlineUsers',Object.keys(usersSoketMap))
    })
})
export {io,app,server}