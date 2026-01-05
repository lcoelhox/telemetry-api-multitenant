import { TelemetryRepository } from '../telemetry.repository';

export class PgTelemetryRepository implements TelemetryRepository {
  async save() {
    // TODO: implement persistence using Drizzle ORM
  }

   async findLastByDevice(
    deviceId: string,
    tenantId: string,
    limit: number,
  ) {
    // temporary mock
    return [
      {
        value: 42,
        timestamp: new Date().toISOString(),
      },
    ];
  }
}
