import { Router, Request, Response } from 'express';
import { makeTelemetryController } from '../factories/telemetry.factory';

export const telemetryRouter = Router();

const telemetryController = makeTelemetryController();

telemetryRouter.post('/', (req: Request, res: Response) =>
  telemetryController.ingest(req, res),
);
