import express from 'express';
import { tenantMiddleware } from './middlewares/tenant.middleware';
import { healthRouter } from './routes/health.route';

const app = express();

app.use(express.json());
app.use(tenantMiddleware);

app.use('/health', healthRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
