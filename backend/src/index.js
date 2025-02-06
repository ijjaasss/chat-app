import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDb } from './lib/db.js';
import messageRoutes from './routes/message.route.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path'
import { app ,server} from './lib/socket.js';

dotenv.config();

const PORT = process.env.PORT;
const __dirname=path.resolve()
const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, 
};

app.use(cors(corsOptions)); 

app.use(cookieParser());

app.use(bodyParser.json({ limit: '10mb' }));


app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
if(process.env.NODE_ENV=='production'){
  app.use(express.static(path.join(__dirname,'../frontend/dist')))
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
  })
}

server.listen(PORT, () => {
  console.log('Server is running on port', PORT);
  connectDb(); 
});
