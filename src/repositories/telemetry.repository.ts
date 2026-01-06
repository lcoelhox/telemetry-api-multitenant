export type TelemetryPersistenceInput = {
  tenantId: string;
  deviceId: string;
  value: number;
  timestamp: string;
};

export type TelemetryReading = {
  value: number;
  timestamp: string;
};

export type TelemetryFindInput = {
  tenantId: string;
  deviceId: string;
  limit: number;
};

export interface TelemetryRepository {
  save(input: TelemetryPersistenceInput): Promise<void>;

  findLastByDevice(
    input: { deviceId: string; tenantId: string; limit: number }
  ): Promise<TelemetryReading[]>;
}
