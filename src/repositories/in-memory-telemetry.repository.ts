import { TelemetryRepository, TelemetryPersistenceInput } from './telemetry.repository';

export class InMemoryTelemetryRepository implements TelemetryRepository {
  private data: TelemetryPersistenceInput[] = [];

  async save(input: TelemetryPersistenceInput) {
    this.data.push(input);
    console.log('Telemetry saved:', input);
  }

  async findLastByDevice(deviceId: string, tenantId: string, limit: number) {
    return this.data
      .filter(d => d.deviceId === deviceId && d.tenantId === tenantId)
      .slice(-limit)
      .map(d => ({ value: d.value, timestamp: d.timestamp }));
  }
}