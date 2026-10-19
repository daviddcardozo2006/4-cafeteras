import { describe, test, expect } from 'vitest';
import { Filtrado } from '../../src/models/cafeFiltrado';

describe('Filtrado', () => {
  test.each([
    ['pocillo', 'brasil', 4040],
    ['pocillo', 'colombia', 4280],
    ['pocillo', 'etiopia', 4640],
    ['mediano', 'brasil', 5300],
    ['mediano', 'colombia', 5900],
    ['mediano', 'etiopia', 6800],
    ['taza grande', 'brasil', 6700],
    ['taza grande', 'colombia', 7700],
    ['taza grande', 'etiopia', 9200],
  ] as const)('%s %s cuesta %i', (tamanio, variedad, esperado) => {
    const cafe = new Filtrado(1, tamanio, variedad);
    expect(cafe.calcularPrecio()).toBe(esperado);
  });
});
