import { describe, test, expect, beforeEach } from 'vitest';
import { crearPedido, getAllPedidos, getPedidoById, resetPedidos } from '../../src/services/pedido.service';
import { buscarExpreso, buscarPasteleria } from '../helpers';

describe('pedido.service', () => {
  beforeEach(() => resetPedidos());

  describe('crearPedido', () => {
    test('crea un pedido con su total calculado', () => {
      const expreso = buscarExpreso('BRASIL', 'POCILLO');
      const muffin = buscarPasteleria(2500);

      const pedido = crearPedido([
        { productoId: expreso.id, cantidad: 2 },
        { productoId: muffin.id, cantidad: 1 },
      ]);

      expect(pedido.items).toHaveLength(2);
      expect(pedido.calcularTotal()).toBe(5020 * 2 + 2500);
    });

    test('asigna ids distintos a cada pedido', () => {
      const id = buscarExpreso('BRASIL', 'POCILLO').id;
      const a = crearPedido([{ productoId: id, cantidad: 1 }]);
      const b = crearPedido([{ productoId: id, cantidad: 1 }]);
      expect(a.id).not.toBe(b.id);
    });

    test('lanza error si un producto no existe', () => {
      expect(() => crearPedido([{ productoId: 9999, cantidad: 1 }])).toThrow();
    });

    test('lanza error si la cantidad no es positiva', () => {
      const id = buscarExpreso('BRASIL', 'POCILLO').id;
      expect(() => crearPedido([{ productoId: id, cantidad: 0 }])).toThrow();
      expect(() => crearPedido([{ productoId: id, cantidad: -2 }])).toThrow();
    });

    test('lanza error si el pedido no tiene items', () => {
      expect(() => crearPedido([])).toThrow();
    });

    test('un pedido inválido no queda guardado', () => {
      expect(() => crearPedido([{ productoId: 9999, cantidad: 1 }])).toThrow();
      expect(getAllPedidos()).toHaveLength(0);
    });
  });

  describe('getAllPedidos', () => {
    test('arranca vacío', () => {
      expect(getAllPedidos()).toEqual([]);
    });

    test('devuelve todos los pedidos creados', () => {
      const id = buscarExpreso('BRASIL', 'POCILLO').id;
      crearPedido([{ productoId: id, cantidad: 1 }]);
      crearPedido([{ productoId: id, cantidad: 3 }]);
      expect(getAllPedidos()).toHaveLength(2);
    });
  });

  describe('getPedidoById', () => {
    test('devuelve el pedido con ese id', () => {
      const id = buscarExpreso('BRASIL', 'POCILLO').id;
      const creado = crearPedido([{ productoId: id, cantidad: 1 }]);
      expect(getPedidoById(creado.id)).toBe(creado);
    });

    test('devuelve undefined si no existe', () => {
      expect(getPedidoById(9999)).toBeUndefined();
    });
  });
});
