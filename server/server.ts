/**
 * Standalone Backend Server Entry Point (For Containerized / Microservice Deployment)
 */

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import connectDB, { dbState } from './config/db.ts';
import authRoutes from './routes/authRoutes.ts';
import consultationRoutes from './routes/consultationRoutes.ts';
import practiceRoutes from './routes/practiceRoutes.ts';
import { sanitizeInput } from './middleware/sanitizeMiddleware.ts';
import { errorHandler } from './middleware/errorMiddleware.ts';
import logger from './utils/logger.ts';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);

await connectDB();

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
);

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
    credentials: true
  })
);

app.use(express.json({ limit: '150kb' }));
app.use(express.urlencoded({ extended: true, limit: '150kb' }));
app.use(cookieParser());
app.use(sanitizeInput);

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'OPERATIONAL',
    service: 'Job Square Backend Microservice',
    timestamp: new Date().toISOString(),
    database: dbState
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/practices', practiceRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    logger.info(`Job Square Backend Service listening on port ${PORT}`);
  });
}

export default app;
