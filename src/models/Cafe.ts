import { Producto } from './Producto';
import { tamaño, variedad } from './types';

const PRECIO_GRAMO_MAPA = {
  'BRASIL': 140,
  'COLOMBIA': 180,
  'ETIOPIA': 240
};

export abstract class Cafe extends Producto {
  public precioxGramo: number;

  constructor(
    id: number,
    nombre: string,
    public variedad: variedad,
    precioBase: number,
    public tamaño: tamaño
  ) {
    super(id, nombre, variedad, precioBase);
    this.precioxGramo = PRECIO_GRAMO_MAPA[variedad];
  }
}