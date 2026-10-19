import { describe, test, expect } from 'vitest';
import { Filtrado } from '../../src/models/cafeFiltrado';

describe('Filtrado', () => {
  test.each([
    ['POCILLO', 'BRASIL', 4040],
    ['POCILLO', 'COLOMBIA', 4280],
    ['POCILLO', 'ETIOPIA', 4640],
    ['MEDIANO', 'BRASIL', 5300],
    ['MEDIANO', 'COLOMBIA', 5900],
    ['MEDIANO', 'ETIOPIA', 6800],
    ['TAZA GRANDE', 'BRASIL', 6700],
    ['TAZA GRANDE', 'COLOMBIA', 7700],
    ['TAZA GRANDE', 'ETIOPIA', 9200],
  ] as const)('%s %s cuesta %i', (tamaño, variedad, esperado) => {
    const cafe = new Filtrado(1, variedad, tamaño);
    expect(cafe.calcularPrecio()).toBe(esperado);
  });
});
