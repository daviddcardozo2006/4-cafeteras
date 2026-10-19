import { describe, test, expect } from 'vitest';
import { Expreso } from '../../src/models/cafeExpreso'

describe('Expreso', () => {
  test.each([
    ['POCILLO', 'BRASIL', 5020],
    ['POCILLO', 'COLOMBIA', 5740],
    ['POCILLO', 'ETIOPIA', 6820],
    ['MEDIANO', 'BRASIL', 6280],
    ['MEDIANO', 'COLOMBIA', 7360],
    ['MEDIANO', 'ETIOPIA', 8980],
    ['TAZA GRANDE', 'BRASIL', 7540],
    ['TAZA GRANDE', 'COLOMBIA', 8980],
    ['TAZA GRANDE', 'ETIOPIA', 11140],
  ] as const)('%s %s cuesta %i', (tamaño, variedad, esperado) => {
    const cafe = new Expreso(1, variedad, tamaño);
    expect(cafe.calcularPrecio()).toBe(esperado);
  });
});
