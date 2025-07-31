import request from 'supertest';
import server from '../../server';
import { response } from 'express';

describe('POST /products', () => {
  it('validar errores', async () => {
    const response = await request(server).post('/products').send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(4);

    expect(response.status).not.toBe(401);
    expect(response.body.errors).not.toHaveLength(2);
  });

  it('validar precio mayor a 0', async () => {
    const response = await request(server).post('/products').send({
      name: 'Televisor',
      price: 0,
      availability: true,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);

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

describe('GET /products', () => {
  it('que la url exista', async () => {
    const response = await request(server).get('/products');
    expect(response.status).not.toBe(404);
  });

  it('respuesta GET con Json', async () => {
    const response = await request(server).get('/products');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveLength(1);

    expect(response.body).not.toHaveProperty('errors');
  });
});

describe('GET /products/:id', () => {
  it('Should return a 404 response for a non-existent product', async () => {
    const productID = 2000;
    const response = await request(server).get(`/products/${productID}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Producto no encontrado');
  });

  it('sould check a valid ID in the URL', async () => {
    const response = await request(server).get(`/products/not-valid-url`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe('ID no válido');
  });

  it('get a JSON response, single product', async () => {
    const response = await request(server).get(`/products/1`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

describe('PUT /products/:id', () => {
  it('sould check a valid ID in the URL', async () => {
    const response = await request(server).put(`/products/not-valid-url`).send({
      name: 'Monitor Nuevo',
      price: 1000,
      availability: false,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe('ID no válido');
  });

  it('validating erros in update', async () => {
    const response = await request(server).put(`/products/1`).send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(5);

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty('data');
  });

  it('price is greater than 0 ', async () => {
    const response = await request(server).put(`/products/1`).send({
      name: 'Monitor Nuevo',
      price: -1000,
      availability: false,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(1);

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty('data');
  });

  it('non-existent product', async () => {
    const productID = 2000;
    const response = await request(server).put(`/products/${productID}`).send({
      name: 'Monitor Nuevo',
      price: 1000,
      availability: false,
    });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Producto no encontrado');
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty('data');
  });

  it('update valid data', async () => {
    const productID = 2000;
    const response = await request(server).put(`/products/1`).send({
      name: 'Monitor Nuevo',
      price: 1000,
      availability: false,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty('errors');
  });
});

describe('DELETE /products/:id', () => {
  it('sould check a valid ID in the URL', async () => {
    const response = await request(server).delete(`/products/not-valid-url`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe('ID no válido');
  });
});
