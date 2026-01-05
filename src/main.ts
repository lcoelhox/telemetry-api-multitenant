import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/health', (_: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
