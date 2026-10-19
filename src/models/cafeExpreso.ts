import { Cafe } from './Cafe';
import { tamaño, variedad } from './types';

const TAMAÑO_MAPA = {
  'POCILLO': 18,
  'MEDIANO': 27,
  'TAZA GRANDE': 36
};

export class Expreso extends Cafe {
  constructor(
    id: number,
    variedad: variedad,
    tamaño: tamaño,
    precioBase: number = 2500
  ) {
    super(id, 'Expreso', variedad, precioBase, tamaño);
  }

  calcularPrecio(): number {
    const gramos = TAMAÑO_MAPA[this.tamaño];
    return this.precioBase + (gramos * this.precioxGramo);
  }
}
