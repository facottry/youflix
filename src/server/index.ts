import express from 'express';
import cors from 'cors';
import { join } from 'path';
import { connectMongoDB } from './config/database';
import videosRouter from './routes/videos';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use('/uploads', express.static(join(process.cwd(), 'uploads')));

// Routes
app.use('/api/videos', videosRouter);

// Connect to MongoDB and start server
connectMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});