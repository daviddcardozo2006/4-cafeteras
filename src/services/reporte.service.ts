import { Pedido } from '../models/pedido';

// Funciones puras: reciben la lista de pedidos y no dependen de dónde se guardan.

export const facturacionTotal = (pedidos: Pedido[]): number =>
  pedidos.reduce((total, pedido) => total + pedido.calcularTotal(), 0);

export const cantidadPorProducto = (pedidos: Pedido[]): Record<string, number> => {
  const cantidades: Record<string, number> = {};

  for (const pedido of pedidos) {
    for (const item of pedido.items) {
      const nombre = item.producto.nombre;
      cantidades[nombre] = (cantidades[nombre] ?? 0) + item.cantidad;
    }
  }

  return cantidades;
};

export interface ProductoMasVendido {
  producto: string;
  cantidad: number;
}

export const masVendido = (pedidos: Pedido[]): ProductoMasVendido | null => {
  const cantidades = cantidadPorProducto(pedidos);

  let resultado: ProductoMasVendido | null = null;
  for (const [producto, cantidad] of Object.entries(cantidades)) {
    if (resultado === null || cantidad > resultado.cantidad) {
      resultado = { producto, cantidad };
    }
  }

  return resultado;
};
