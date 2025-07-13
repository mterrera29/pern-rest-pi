import request from 'supertest';
import server from '../../server';

describe('POST /products', () => {
  it('crear nuevo producto', async () => {
    const response = await request(server).post('/products').send({
      name: 'Televisor',
      price: 900,
      availability: true,
    });
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('data');
  });
});
