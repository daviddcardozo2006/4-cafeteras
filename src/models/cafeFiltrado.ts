import { Cafe } from './Cafe';
import { tamaño, variedad } from './types';

export class Filtrado extends Cafe {
  constructor(
    id: number,
    tamanio: tamaño,
    variedad: variedad,
    precioBase: number = 3200
  ) {
    super(id, 'Filtrado', precioBase, tamanio, variedad);
  }

  private obtenerGramos(): number {
    switch (this.tamanio) {
      case 'pocillo': return 6;
      case 'mediano': return 15;
      case 'taza grande': return 25;
      default: throw new Error('Tamaño no válido.');
    }
  }

  calcularPrecio(): number {
    return this.precioBase + (this.obtenerGramos() * this.obtenerPrecioGramo());
  }
}