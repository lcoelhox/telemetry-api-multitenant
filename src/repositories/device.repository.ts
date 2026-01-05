export interface DeviceRepository {
  findById(id: string): Promise<{
    id: string;
    tenantId: string;
  } | null>;
}
