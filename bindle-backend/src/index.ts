import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth';
import listingsRouter from './routes/listings';
import userRoutes from './routes/users';
import uploadRoute from './routes/upload';
import achievementRoutes from './routes/achievements'; // ✅ ADD THIS LINE

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

app.use((req, res, next) => {
  if (req.method === 'GET' || req.method === 'HEAD') {
    return next();
  }
  express.json()(req, res, next);
});

app.use(cookieParser(process.env.COOKIE_SECRET));

// Routes
app.use('/api/listings', listingsRouter);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoute);
app.use('/api/achievements', achievementRoutes); // ✅ ADD THIS LINE

// Health check
app.get('/', (req, res) => {
  res.send('BindleV2 API is live');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
