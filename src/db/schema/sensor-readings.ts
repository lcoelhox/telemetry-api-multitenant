import { pgTable, uuid, varchar, numeric, timestamp } from 'drizzle-orm/pg-core';
import { devices } from './devices';

export const sensorReadings = pgTable('sensor_readings', {
  id: uuid('id').defaultRandom().primaryKey(),

  tenantId: varchar('tenant_id', { length: 50 }).notNull(),
  deviceId: uuid('device_id')
    .notNull()
    .references(() => devices.id),

  metric: varchar('metric', { length: 50 }).notNull(),
  value: numeric('value').notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});
