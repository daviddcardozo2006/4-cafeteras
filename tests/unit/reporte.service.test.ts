import { describe, test, expect } from 'vitest';
import { facturacionTotal, cantidadPorProducto, masVendido } from '../../src/services/reporte.service';
import { Pedido } from '../../src/models/pedido';
import { ItemPedido } from '../../src/models/ItemPedido';
import { Expreso } from '../../src/models/cafeExpreso';
import { Filtrado } from '../../src/models/cafeFiltrado';
import { Pasteleria } from '../../src/models/pasteleria';

// Funciones puras: reciben la lista de pedidos, así no dependen del estado del servicio.
const expreso = new Expreso(1, 'BRASIL', 'POCILLO');        // 5020
const filtrado = new Filtrado(2, 'COLOMBIA', 'MEDIANO');    // 5900
const torta = new Pasteleria(3, 'Torta selva negra', 4200); // 4200

const pedidos = [
  new Pedido(1, [new ItemPedido(expreso, 2), new ItemPedido(torta, 1)]), // 10040 + 4200 = 14240
  new Pedido(2, [new ItemPedido(filtrado, 1), new ItemPedido(expreso, 3)]), // 5900 + 15060 = 20960
];

describe('facturacionTotal', () => {
  test('suma los totales de todos los pedidos', () => {
    expect(facturacionTotal(pedidos)).toBe(14240 + 20960);
  });

  test('sin pedidos factura 0', () => {
    expect(facturacionTotal([])).toBe(0);
  });
});

describe('cantidadPorProducto', () => {
  test('suma las cantidades vendidas agrupando por nombre de producto', () => {
    expect(cantidadPorProducto(pedidos)).toEqual({
      [expreso.nombre]: 5,
      [filtrado.nombre]: 1,
      [torta.nombre]: 1,
    });
  });

  test('sin pedidos devuelve un objeto vacío', () => {
    expect(cantidadPorProducto([])).toEqual({});
  });
});

describe('masVendido', () => {
  test('devuelve el producto con más unidades vendidas', () => {
    expect(masVendido(pedidos)).toEqual({ producto: expreso.nombre, cantidad: 5 });
  });

  test('sin pedidos devuelve null', () => {
    expect(masVendido([])).toBeNull();
  });
});
