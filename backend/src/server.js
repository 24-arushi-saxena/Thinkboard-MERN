import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/ratelimiter.js';



dotenv.config();

const PORT= process.env.PORT || 3000;
const app= express();

app.use(
  cors({
    origin: 'http://localhost:5173',
  }));
//middleware
app.use(express.json());
app.use(rateLimiter);



app.use("/api/notes",notesRoutes);



const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT,()=>{
    
    console.log("Server started on port:", PORT)

});


  } catch (error) {
    console.error("Startup error:", error);
  }
};

startServer();