import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import connectDB from './config/database';
import batchRoutes from './routes/batch.routes';
import predictionRoutes from './routes/prediction.routes';
import { notFound, errorHandler } from './middleware/errorHandler';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/batch', batchRoutes);
app.use('/api/predict', predictionRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Env: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS: ${process.env.CORS_ORIGIN || 'http://localhost:3000'}`);
  console.log(`🤖 ML service: ${process.env.ML_SERVICE_URL || 'http://localhost:8000'}`);
});

export default app;