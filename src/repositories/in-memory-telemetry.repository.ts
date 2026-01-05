import { TelemetryRepository, TelemetryPersistenceInput } from './telemetry.repository';

export class InMemoryTelemetryRepository implements TelemetryRepository {
  async save(input: TelemetryPersistenceInput) {
    console.log('Telemetry saved:', input);
  }
}
