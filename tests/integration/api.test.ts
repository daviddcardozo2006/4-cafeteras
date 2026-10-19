import { describe, test, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../../src/app';
import { resetPedidos } from '../../src/services/pedido.service';
import { buscarExpreso, buscarFiltrado, buscarPasteleria } from '../helpers';

beforeEach(() => resetPedidos());

describe('GET /productos', () => {
  test('devuelve los 20 productos', async () => {
    const res = await request(app).get('/productos');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(20);
  });
});

describe('GET /productos/:id', () => {
  test('devuelve el producto pedido', async () => {
    const expreso = buscarExpreso('BRASIL', 'POCILLO');
    const res = await request(app).get(`/productos/${expreso.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(expreso.id);
  });

  test('404 si el producto no existe', async () => {
    const res = await request(app).get('/productos/9999');
    expect(res.status).toBe(404);
  });
});

describe('POST /pedidos', () => {
  test('crea el pedido y devuelve su total calculado', async () => {
    const expreso = buscarExpreso('BRASIL', 'POCILLO');   // 5020
    const torta = buscarPasteleria(4200);                 // 4200

    const res = await request(app)
      .post('/pedidos')
      .send({ items: [{ productoId: expreso.id, cantidad: 2 }, { productoId: torta.id, cantidad: 1 }] });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.total).toBe(5020 * 2 + 4200);
  });

  test('400 si un producto no existe', async () => {
    const res = await request(app).post('/pedidos').send({ items: [{ productoId: 9999, cantidad: 1 }] });
    expect(res.status).toBe(400);
  });

  test('400 si el body no tiene items', async () => {
    const res = await request(app).post('/pedidos').send({});
    expect(res.status).toBe(400);
  });
});

describe('GET /pedidos', () => {
  test('lista todos los pedidos', async () => {
    const id = buscarExpreso('BRASIL', 'POCILLO').id;
    await request(app).post('/pedidos').send({ items: [{ productoId: id, cantidad: 1 }] });
    await request(app).post('/pedidos').send({ items: [{ productoId: id, cantidad: 2 }] });

    const res = await request(app).get('/pedidos');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });
});

describe('GET /pedidos/:id', () => {
  test('devuelve el pedido con su total', async () => {
    const id = buscarExpreso('BRASIL', 'POCILLO').id;
    const creado = await request(app).post('/pedidos').send({ items: [{ productoId: id, cantidad: 1 }] });

    const res = await request(app).get(`/pedidos/${creado.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(creado.body.id);
    expect(res.body.total).toBe(5020);
  });

  test('404 si el pedido no existe', async () => {
    const res = await request(app).get('/pedidos/9999');
    expect(res.status).toBe(404);
  });
});

describe('GET /reportes/facturacion', () => {
  test('devuelve la suma de todos los pedidos', async () => {
    const expreso = buscarExpreso('BRASIL', 'POCILLO');      // 5020
    const filtrado = buscarFiltrado('ETIOPIA', 'TAZA GRANDE'); // 9200
    await request(app).post('/pedidos').send({ items: [{ productoId: expreso.id, cantidad: 2 }] });
    await request(app).post('/pedidos').send({ items: [{ productoId: filtrado.id, cantidad: 1 }] });

    const res = await request(app).get('/reportes/facturacion');
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(5020 * 2 + 9200);
  });

  test('0 si no hay pedidos', async () => {
    const res = await request(app).get('/reportes/facturacion');
    expect(res.body.total).toBe(0);
  });
});

describe('GET /reportes/mas-vendido', () => {
  test('devuelve el producto con más unidades vendidas', async () => {
    const expreso = buscarExpreso('BRASIL', 'POCILLO');
    const filtrado = buscarFiltrado('ETIOPIA', 'TAZA GRANDE');
    await request(app).post('/pedidos').send({ items: [{ productoId: expreso.id, cantidad: 1 }] });
    await request(app).post('/pedidos').send({ items: [{ productoId: filtrado.id, cantidad: 4 }] });

    const res = await request(app).get('/reportes/mas-vendido');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ producto: filtrado.nombre, cantidad: 4 });
  });

  test('404 si todavía no hay ventas', async () => {
    const res = await request(app).get('/reportes/mas-vendido');
    expect(res.status).toBe(404);
  });
});
