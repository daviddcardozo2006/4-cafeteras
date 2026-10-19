import { Pedido } from '../models/pedido';
import { ItemPedido } from '../models/ItemPedido';
import { getById } from './producto.service';

// Lo que llega en el body del POST /pedidos
export interface ItemPedidoInput {
  productoId: number;
  cantidad: number;
}

let pedidos: Pedido[] = [];
let siguienteId = 1;

export const crearPedido = (items: ItemPedidoInput[]): Pedido => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('El pedido debe tener al menos un item.');
  }

  // Primero validamos y armamos todos los items; si alguno falla,
  // se lanza el error antes de guardar nada.
  const itemsPedido = items.map(({ productoId, cantidad }) => {
    const producto = getById(productoId);
    if (!producto) {
      throw new Error(`El producto ${productoId} no existe.`);
    }
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      throw new Error(`Cantidad inválida para el producto ${productoId}.`);
    }
    return new ItemPedido(producto, cantidad);
  });

  const pedido = new Pedido(siguienteId++, itemsPedido);
  pedidos.push(pedido);
  return pedido;
};

export const getAllPedidos = (): Pedido[] => pedidos;

export const getPedidoById = (id: number): Pedido | undefined =>
  pedidos.find((p) => p.id === id);

// Solo para tests: deja el "almacenamiento" vacío entre caso y caso.
export const resetPedidos = (): void => {
  pedidos = [];
  siguienteId = 1;
};
