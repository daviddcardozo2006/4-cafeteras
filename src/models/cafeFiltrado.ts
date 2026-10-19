import { Cafe } from './Cafe';
import { tamaño, variedad } from './types';

const TAMAÑO_MAPA = {
  'POCILLO': 6,
  'MEDIANO': 15,
  'TAZA GRANDE': 25
};

export class Filtrado extends Cafe {
  constructor(
    id: number,
    variedad: variedad,
    tamaño: tamaño,
    precioBase: number = 3200
  ) {
    super(id, 'Filtrado', variedad, precioBase, tamaño);
  }

  calcularPrecio(): number {
    const gramos = TAMAÑO_MAPA[this.tamaño];
    return this.precioBase + (gramos * this.precioxGramo);
  }
}