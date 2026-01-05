import { IngestTelemetryUseCase } from '../domain/telemetry/ingest-telemetry.usecase';
import { TelemetryController } from '../controllers/telemetry.controller';
import { PgDeviceRepository } from '../repositories/impl/device.repository.pg';
import { PgTelemetryRepository } from '../repositories/impl/telemetry.repository.pg';

export function makeTelemetryController() {
  const deviceRepository = new PgDeviceRepository();
  const telemetryRepository = new PgTelemetryRepository();

  const ingestTelemetryUseCase = new IngestTelemetryUseCase(
    deviceRepository,
    telemetryRepository,
  );

  return new TelemetryController(ingestTelemetryUseCase);
}
