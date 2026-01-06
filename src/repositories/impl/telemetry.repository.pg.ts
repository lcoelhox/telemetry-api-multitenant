import {
  TelemetryRepository,
  TelemetryPersistenceInput,
  TelemetryReading,
  TelemetryFindInput,
} from '../telemetry.repository';
import { db } from '../../db';
import { sensorReadings } from '../../db/schema';
import { eq, and, desc } from 'drizzle-orm';

export class PgTelemetryRepository implements TelemetryRepository {
  async save(input: TelemetryPersistenceInput): Promise<void> {
    const { deviceId, tenantId, value, timestamp } = input;

    await db.insert(sensorReadings).values({
      deviceId: deviceId,
      tenantId: tenantId,
      value: value,
      timestamp: new Date(timestamp),
    });
  }

  async findLastByDevice(input: TelemetryFindInput): Promise<TelemetryReading[]> {
    const { deviceId, tenantId, limit } = input;

    const readings = await db
      .select({
        value: sensorReadings.value,
        timestamp: sensorReadings.timestamp,
      })
      .from(sensorReadings)
      .where(
        and(
          eq(sensorReadings.deviceId, deviceId),
          eq(sensorReadings.tenantId, tenantId),
        )
      )
      .orderBy(desc(sensorReadings.timestamp))
      .limit(limit);

    return readings.map((r) => ({
      value: Number(r.value),
      timestamp: r.timestamp.toISOString(),
    }));
  }
}

