import { DeviceRepository } from './device.repository';

export class InMemoryDeviceRepository implements DeviceRepository {
  private devices = [
    { id: 'device-1', tenantId: 'tenant_a' },
  ];

  async findById(id: string) {
    return this.devices.find(d => d.id === id) ?? null;
  }
}
