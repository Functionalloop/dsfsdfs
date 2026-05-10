import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import activitiesRouter from './routes/activities';
import itinerariesRouter from './routes/itineraries';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Simple health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/activities', activitiesRouter);
app.use('/api/itineraries', itinerariesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
