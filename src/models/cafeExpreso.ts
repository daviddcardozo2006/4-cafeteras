import { Cafe } from './Cafe';
import { tamaño, variedad } from './types';

export class Expreso extends Cafe {
  constructor(
    id: number,
    tamanio: tamaño,
    variedad: variedad,
    precioBase: number = 2500
  ) {
    super(id, 'Filtrado', precioBase, tamanio, variedad);
  }

  private obtenerGramos(): number {
    switch (this.tamanio) {
      case 'pocillo': return 18;
      case 'mediano': return 27;
      case 'taza grande': return 36;
      default: throw new Error('Tamaño no válido.');
    }
  }

  calcularPrecio(): number {
    return this.precioBase + (this.obtenerGramos() * this.obtenerPrecioGramo());
  }
}
