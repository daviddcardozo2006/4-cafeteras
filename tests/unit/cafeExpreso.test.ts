import { describe, test, expect } from 'vitest';
import { Expreso } from '../../src/models/cafeExpreso'

describe('Expreso', () => {
  test.each([
    ['pocillo', 'brasil', 5020],
    ['pocillo', 'colombia', 5740],
    ['pocillo', 'etiopia', 6820],
    ['mediano', 'brasil', 6280],
    ['mediano', 'colombia', 7360],
    ['mediano', 'etiopia', 8980],
    ['taza grande', 'brasil', 7540],
    ['taza grande', 'colombia', 8980],
    ['taza grande', 'etiopia', 11140],
  ] as const)('%s %s cuesta %i', (tamanio, variedad, esperado) => {
    const cafe = new Expreso(1, tamanio, variedad);
    expect(cafe.calcularPrecio()).toBe(esperado);
  });
});
