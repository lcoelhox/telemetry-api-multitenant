import { DeviceRepository } from '../device.repository';
import { db } from '../../db';
import { devices } from '../../db/schema';
import { eq } from 'drizzle-orm';

export class PgDeviceRepository implements DeviceRepository {
  async findById(id: string) {
    const devicesFound = await db
      .select()
      .from(devices)
      .where(eq(devices.id, id))
      .limit(1);

    return devicesFound[0] ?? null;
  }
}
