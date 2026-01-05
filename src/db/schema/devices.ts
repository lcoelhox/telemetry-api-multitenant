import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const devices = pgTable('devices', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: varchar('tenant_id', { length: 50 }).notNull(),

  name: varchar('name', { length: 100 }).notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});
