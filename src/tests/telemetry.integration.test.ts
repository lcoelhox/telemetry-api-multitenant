import request from 'supertest';
import { createTestApp } from './testApp';
import { db } from '../db';
import { devices, sensorReadings } from '../db/schema';

const app = createTestApp();

beforeEach(async () => {
  await db.delete(sensorReadings);
  await db.delete(devices);

  await db.insert(devices).values([
    {
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Sensor Teste A',
      tenantId: 'tenant_a',
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Sensor Teste B',
      tenantId: 'tenant_b',
    },
  ]);
});

describe('Telemetry API (multi-tenant)', () => {
  it('should accept telemetry POST and return 202', async () => {
    const res = await request(app)
      .post('/telemetry')
      .set('x-tenant-id', 'tenant_a')
      .send({ deviceId: '11111111-1111-1111-1111-111111111111', value: 123 });

    expect(res.statusCode).toBe(202);
  });

  it('should return last telemetry reading for tenant', async () => {
    const deviceId = '11111111-1111-1111-1111-111111111111';

    await request(app)
      .post('/telemetry')
      .set('x-tenant-id', 'tenant_a')
      .send({ deviceId, value: 123 });

    const res = await request(app)
      .get(`/telemetry/${deviceId}`)
      .set('x-tenant-id', 'tenant_a');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].value).toBe(123);
  });

  it('should return at most 10 telemetry readings', async () => {
    const deviceId = '11111111-1111-1111-1111-111111111111';

    for (let i = 1; i <= 15; i++) {
      await request(app)
        .post('/telemetry')
        .set('x-tenant-id', 'tenant_a')
        .send({ deviceId, value: i });
    }

    const res = await request(app)
      .get(`/telemetry/${deviceId}`)
      .set('x-tenant-id', 'tenant_a');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeLessThanOrEqual(10);
    expect(res.body[0].value).toBe(15);
  });

  it('should prevent cross-tenant access', async () => {
    const res = await request(app)
      .get('/telemetry/11111111-1111-1111-1111-111111111111')
      .set('x-tenant-id', 'tenant_b');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});
