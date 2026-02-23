import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';


import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/ratelimiter.js';



dotenv.config();

const PORT= process.env.PORT || 3000;
const app= express();
const __dirname=path.resolve();


//middleware
if(process.env.NODE_ENV !== "production" ){
    app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
}

app.use(express.json());
app.use(rateLimiter);



app.use("/api/notes",notesRoutes);


if (process.env.NODE_ENV === "production") {

  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // catch-all route for SPA – use a regex to avoid path-to-regexp parsing errors
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


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