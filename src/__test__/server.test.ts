import request from 'supertest';
import server from '../server';
import { connectDB } from '../server';
import db from '../config/db';

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

jest.mock('../config/db');

describe('connectDB', () => {
  it('database conection error', async () => {
    jest
      .spyOn(db, 'authenticate')
      .mockRejectedValueOnce(new Error('Hubo un error al conectar a la DB'));
  });
});
