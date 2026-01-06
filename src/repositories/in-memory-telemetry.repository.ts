import {
  TelemetryRepository,
  TelemetryPersistenceInput,
  TelemetryFindInput,
  TelemetryReading,
} from './telemetry.repository';

export class InMemoryTelemetryRepository implements TelemetryRepository {
  private data: TelemetryPersistenceInput[] = [];

  async save(input: TelemetryPersistenceInput): Promise<void> {
    this.data.push(input);
  }

  async findLastByDevice(input: TelemetryFindInput): Promise<TelemetryReading[]> {
    const { deviceId, tenantId, limit } = input;

    const filtered = this.data
      .filter(d => d.deviceId === deviceId && d.tenantId === tenantId)
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
      .slice(0, limit);

    return filtered.map(d => ({
      value: d.value,
      timestamp: d.timestamp,
    }));
  }
}
