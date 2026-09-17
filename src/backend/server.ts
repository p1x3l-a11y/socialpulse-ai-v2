import express, { Request, Response } from 'express';
import cors from 'cors';

// Stub services – they will later read from SQLite or static JSON
import { getTwitterData, getTelegramData } from './services/dataService';
import { getSentiment, getDemographics, getTrends, getNetwork } from './models/aiModels';

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Platform data endpoints (currently return static stub data)
app.get('/api/twitter', async (_req, res) => {
  const data = await getTwitterData();
  res.json(data);
});
app.get('/api/telegram', async (_req, res) => {
  const data = await getTelegramData();
  res.json(data);
});
app.get('/api/instagram', (_req, res) => res.json({ message: 'placeholder' }));
app.get('/api/facebook', (_req, res) => res.json({ message: 'placeholder' }));

// AI/ML vector endpoints (stub implementations)
app.get('/api/sentiment', async (_req, res) => {
  const result = await getSentiment();
  res.json(result);
});
app.get('/api/demographics', async (_req, res) => {
  const result = await getDemographics();
  res.json(result);
});
app.get('/api/trends', async (_req, res) => {
  const result = await getTrends();
  res.json(result);
});
app.get('/api/network', async (_req, res) => {
  const result = await getNetwork();
  res.json(result);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
