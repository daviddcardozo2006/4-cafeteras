
import { ItemPedido } from './ItemPedido';

export class Pedido {
  constructor(
    public id: number,
    public items: ItemPedido[] = [],
    public estado: string = 'pendiente'
  ) {}

  calcularTotal(): number {
    return this.items.reduce((acumulador, actual) => acumulador + actual.calcularSubtotal(), 0);
  }
}