// //import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/dbConfig.js";
// import express from "express";

// import bodyParser from 'body-parser';
// //const bodyparser=require('body-parser');
// const {Server}=require('socket.io');
// const  io=new Server();
// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 8000;
// app.use(bodyparser.json());
// // Middleware
// app.use(express.json());
// app.use(bodyparser.json());
// connectDB();

// io.on("connection",(socket)=>{});

// app.listen(PORT, () => {
//   console.log('Server running ...')
// });
// io.listen(8001);
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

import connectDB from "./config/dbConfig.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Socket.IO Server
const io = new Server({
cors:true,
});
const emailToSocketIdMap = new Map();
const socketToEmailMap = new Map();
io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on('room:join',(data)=>{
     const {email,room}=data;
     emailToSocketIdMap.set(email,socket.id);
     socketToEmailMap.set(socket.id,email);
     io.to(room).emit('user:joined',{email,Id:socket.id});
     socket.join(room);
     io.to(socket.id).emit('room:join',data);
    });
});

// Express Routes
app.get("/", (req, res) => {
    res.send("Backend Running");    
});

// Start Express Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Start Socket Server
io.listen(8001);

console.log("Socket.IO running on port 8001");