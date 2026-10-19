import { describe, test, expect } from 'vitest';
import { Pedido } from '../../src/models/pedido';
import { ItemPedido } from '../../src/models/ItemPedido';
import { Expreso } from '../../src/models/cafeExpreso';
import { Filtrado } from '../../src/models/cafeFiltrado';
import { Pasteleria } from '../../src/models/pasteleria';

describe('ItemPedido', () => {
  test('el subtotal es calcularPrecio() × cantidad', () => {
    const item = new ItemPedido(new Expreso(1, 'BRASIL', 'POCILLO'), 3);
    expect(item.calcularSubtotal()).toBe(5020 * 3);
  });
});

describe('Pedido', () => {
  test('un pedido sin items tiene total 0', () => {
    expect(new Pedido(1).calcularTotal()).toBe(0);
  });

  test('un pedido con un solo item', () => {
    const pedido = new Pedido(1, [new ItemPedido(new Pasteleria(1, 'Muffin de chocolate', 2500), 2)]);
    expect(pedido.calcularTotal()).toBe(5000);
  });

  test('un pedido con varios items suma los subtotales', () => {
    const pedido = new Pedido(1, [
      new ItemPedido(new Expreso(1, 'BRASIL', 'POCILLO'), 2),        // 5020 × 2 = 10040
      new ItemPedido(new Filtrado(2, 'ETIOPIA', 'TAZA GRANDE'), 1),  // 9200 × 1 =  9200
      new ItemPedido(new Pasteleria(3, 'Torta selva negra', 4200), 1), // 4200 × 1 =  4200
    ]);
    expect(pedido.calcularTotal()).toBe(23440);
  });

  test('arranca en estado pendiente', () => {
    expect(new Pedido(1).estado).toBe('pendiente');
  });
});
