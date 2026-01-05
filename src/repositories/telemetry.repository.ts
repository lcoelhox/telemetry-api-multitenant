export type TelemetryPersistenceInput = {
  tenantId: string;
  deviceId: string;
  value: number;
  timestamp: string;
};

export interface TelemetryRepository {
  save(input: TelemetryPersistenceInput): Promise<void>;
}
