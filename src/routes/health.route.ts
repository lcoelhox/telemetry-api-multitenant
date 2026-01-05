import { Router, Request, Response } from 'express';

export const healthRouter = Router();

healthRouter.get('/', (req: Request, res: Response) => {
  return res.json({
    status: 'ok',
    tenantId: req.tenantId ?? null,
  });
});
