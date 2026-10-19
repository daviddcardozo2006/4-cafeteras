import { Producto } from './Producto';

export class Pasteleria extends Producto {
  constructor(
    id: number,
    variedad: string,
    precioBase: number
  ) {
    let nombre = "PASTELERIA"
    super(id, nombre, variedad, precioBase);
  }

  calcularPrecio(): number {
    return this.precioBase;
  }
}
