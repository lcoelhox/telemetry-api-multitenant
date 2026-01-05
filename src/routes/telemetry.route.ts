import { Router } from 'express';
import { TelemetryController } from '../controllers/telemetry.controller';
import { IngestTelemetryUseCase } from '../domain/telemetry/ingest-telemetry.usecase';
import { PgDeviceRepository } from '../repositories/impl/device.repository.pg';
import { PgTelemetryRepository } from '../repositories/impl/telemetry.repository.pg';

export const telemetryRouter = Router();

const deviceRepository = new PgDeviceRepository();
const telemetryRepository = new PgTelemetryRepository();

const ingestTelemetryUseCase = new IngestTelemetryUseCase(
  deviceRepository,
  telemetryRepository,
);

const telemetryController = new TelemetryController(
  ingestTelemetryUseCase,
);

telemetryRouter.post('/', (req, res) =>
  telemetryController.ingest(req, res),
);
