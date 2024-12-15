import dotenv from 'dotenv'
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors : {
        origin : 
          
          process.env.CORS_SITE ,
        
    }
});

io.on("connection", (socket) => {
  console.log("Socket Connected : " , socket.id);

  socket.on('send_data', (data) => {
    
    io.emit('screen_data', data);
  });


  socket.on("disconnect" , ()=>{
    console.log("User Disconnected : " , socket.id)
  } )
});



app.get('/' , (req ,res)=> {
    res.send("Server up and running")
})

httpServer.listen(3000 , ()=> {
    console.log("Server Started")
})
