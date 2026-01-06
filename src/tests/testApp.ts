import express from 'express';
import { tenantMiddleware } from '../middlewares/tenant.middleware';
import { telemetryRouter } from '../routes/telemetry.route';

export function createTestApp() {
  const app = express();

  app.use(express.json());
  app.use(tenantMiddleware);
  app.use('/telemetry', telemetryRouter);

  return app;
}
