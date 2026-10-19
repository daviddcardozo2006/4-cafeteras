import { Producto } from './Producto';

export class ItemPedido {
  constructor(
    public producto: Producto,
    public cantidad: number
  ) {}

  calcularSubtotal(): number {
    return this.producto.calcularPrecio() * this.cantidad;
  }
}