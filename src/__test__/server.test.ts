import request from 'supertest';
import server from '../server';

describe('GET /api', () => {
  it('should send back a json res', async () => {
    const res = await request(server).get('/api');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.data).toBe('Desde API');

    expect(res.status).not.toBe(404);
    expect(res.body.data).not.toBe('desde api');

    console.log(res.headers);
  });
});
