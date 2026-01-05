import { DeviceRepository } from '../device.repository';

export class PgDeviceRepository implements DeviceRepository {
  async findById(id: string) {
    // TODO: replace with Drizzle ORM implementation
    return {
      id,
      tenantId: 'tenant_a',
    };
  }
}
