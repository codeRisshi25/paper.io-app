import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/mongo.js'
// import blogRoutes from './routes/blogRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//mongo connection
const conn = await db();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true // This is important for cookies
}));
app.use(express.json());
app.use(cookieParser());

// Routes
// app.use('/api/blogs/', blogRoutes);
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
});

export default app;
