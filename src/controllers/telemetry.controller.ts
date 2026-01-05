import { Request, Response } from 'express';
import { IngestTelemetryUseCase } from '../domain/telemetry/ingest-telemetry.usecase';

export class TelemetryController {
  constructor(
    private readonly ingestTelemetryUseCase: IngestTelemetryUseCase,
  ) {}

  async ingest(req: Request, res: Response) {
    const tenantId = req.tenantId;

    if (!tenantId) {
      return res.status(401).json({ message: 'Tenant not provided' });
    }

    await this.ingestTelemetryUseCase.execute({
      tenantId,
      payload: req.body,
    });

    return res.status(202).json({ status: 'accepted' });
  }
}
