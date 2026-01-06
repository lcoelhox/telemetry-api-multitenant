import { IngestTelemetryUseCase } from '../domain/telemetry/ingest-telemetry.usecase';
import { TelemetryController } from '../controllers/telemetry.controller';
import { PgDeviceRepository } from '../repositories/impl/device.repository.pg';
import { GetTelemetryByDeviceUseCase } from '../domain/telemetry/get-telemetry-by-device.usecase';
import { PgTelemetryRepository } from '../repositories/impl/telemetry.repository.pg';

export function makeTelemetryController() {
  const deviceRepository = new PgDeviceRepository();
  const telemetryRepository = new PgTelemetryRepository();

  const ingestUseCase = new IngestTelemetryUseCase(
    deviceRepository,
    telemetryRepository
  );

  const getByDeviceUseCase = new GetTelemetryByDeviceUseCase(
    telemetryRepository
  );

  return new TelemetryController(
    ingestUseCase,
    getByDeviceUseCase
  );
}
