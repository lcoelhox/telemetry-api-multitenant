import { pgTable, varchar, doublePrecision, timestamp } from 'drizzle-orm/pg-core';

export const sensorReadings = pgTable('sensor_readings', {
  deviceId: varchar('device_id').notNull(),
  tenantId: varchar('tenant_id').notNull(),
  value: doublePrecision('value').notNull(),
  timestamp: timestamp('timestamp').notNull(),
});