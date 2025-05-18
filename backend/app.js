import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import db from './config/mongo.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//mongo connection
const conn = await db();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
});

export default app;
