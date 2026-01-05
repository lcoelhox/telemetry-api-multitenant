import { Request, Response, NextFunction } from 'express';

export function tenantMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const tenantId = req.header('x-tenant-id');

  if (tenantId) {
    req.tenantId = tenantId;
  }

  next();
}
