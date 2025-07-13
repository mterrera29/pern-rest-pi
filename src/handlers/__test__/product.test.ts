import request from 'supertest';
import server from '../../server';

describe('POST /products', () => {
  it('validar errores', async () => {
    const response = await request(server).post('/products').send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(4);

    expect(response.status).not.toBe(401);
    expect(response.body.errors).not.toHaveLength(2);
  });

  it('crear nuevo producto', async () => {
    const response = await request(server).post('/products').send({
      name: 'Televisor',
      price: 900,
      availability: true,
    });
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('data');

    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty('errors');
  });
});
