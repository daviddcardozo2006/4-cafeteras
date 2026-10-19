import { Producto } from './Producto';

export class Pasteleria extends Producto {
  constructor(
    id: number,
    nombre: string,
    variedad: string,
    precioBase: number
  ) {
    super(id, nombre, variedad, precioBase);
  }

  calcularPrecio(): number {
    return this.precioBase;
  }
}