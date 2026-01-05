import { TelemetryRepository } from '../../repositories/telemetry.repository';

type GetTelemetryInput = {
  tenantId: string;
  deviceId: string;
};

export class GetTelemetryByDeviceUseCase {
  constructor(private readonly telemetryRepository: TelemetryRepository) {}

  async execute({ tenantId, deviceId }: GetTelemetryInput) {
    return this.telemetryRepository.findLastByDevice(
      deviceId,
      tenantId,
      10,
    );
  }
}
