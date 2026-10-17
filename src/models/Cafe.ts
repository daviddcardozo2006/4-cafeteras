import { Producto } from './Producto';
import { tamaño, variedad } from './types';

export abstract class Cafe extends Producto {
  constructor(
    id: number,
    nombre: string,
    precioBase: number,
    public tamanio: tamaño,
    public variedad: variedad 
  ) {
    super(id, nombre, precioBase);
  }

  protected obtenerPrecioGramo(): number {
    switch (this.variedad) {
      case 'brasil':
        return 140;
      case 'colombia':
        return 180;
      case 'etiopia':
        return 240;
      default:
        throw new Error(('Variedad no válida.'));
        ;
    }
  }
}