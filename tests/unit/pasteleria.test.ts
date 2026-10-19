import { describe, test, expect } from 'vitest';
import { Pasteleria } from '../../src/models/pasteleria';

describe('Pasteleria', () => {
  test.each([
    ['Muffin de chocolate', 2500],
    ['Torta selva negra', 4200],
  ])('%s cuesta %i', (nombre, precio) => {
    const producto = new Pasteleria(1, nombre, precio);
    expect(producto.calcularPrecio()).toBe(precio);
  });
});
