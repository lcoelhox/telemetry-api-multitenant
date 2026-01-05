import { TelemetryRepository } from '../../repositories/telemetry.repository';
import { DeviceRepository } from '../../repositories/device.repository';

interface IngestTelemetryInput {
  tenantId: string;
  payload: {
    deviceId: string;
    value: number;
    timestamp?: string;
  };
}

export class IngestTelemetryUseCase {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly telemetryRepository: TelemetryRepository,
  ) {}

  async execute({ tenantId, payload }: IngestTelemetryInput) {
    const device = await this.deviceRepository.findById(payload.deviceId);

    if (!device || device.tenantId !== tenantId) {
      throw new Error('Device does not belong to tenant');
    }

    await this.telemetryRepository.save({
      tenantId,
      deviceId: payload.deviceId,
      value: payload.value,
      timestamp: payload.timestamp ?? new Date().toISOString(),
    });
  }
}
