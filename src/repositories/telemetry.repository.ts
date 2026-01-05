export type TelemetryPersistenceInput = {
  tenantId: string;
  deviceId: string;
  value: number;
  timestamp: string;
};

export interface TelemetryRepository {
  save(input: TelemetryPersistenceInput): Promise<void>;

   findLastByDevice(
    deviceId: string,
    tenantId: string,
    limit: number,
  ): Promise<
    {
      value: number;
      timestamp: string;
    }[]
  >;
}
