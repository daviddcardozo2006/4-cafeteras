import { Pedido } from '../models/pedido';
import { ItemPedido } from '../models/ItemPedido';
import { getById as getProductoById } from './producto.service';

const pedidos: Pedido[] = [];
let pedidoIdCounter = 1;

// Crear pedido nuevo (POST /pedidos)
export const crearPedido = (itemsInput: { productoId: number; cantidad: number }[]): Pedido => {
  const items: ItemPedido[] = [];

  itemsInput.map(item => {
    const producto = getProductoById(item.productoId);
    if (producto) {
      items.push(new ItemPedido(producto, item.cantidad));
    }
  });

  const nuevoPedido = new Pedido(pedidoIdCounter++, items, 'pendiente');
  pedidos.push(nuevoPedido);
  return nuevoPedido;
};

export const getAllPedidos = (): Pedido[] => pedidos;


export const getPedidoById = (id: number): Pedido | undefined => {
  return pedidos.find(p => p.id === id);
};


export const calcularFacturacionTotal = (): number => {
  return pedidos.reduce((acumulador, actual) => acumulador + actual.calcularTotal(), 0);
};


export const obtenerCantidadVendidaPorProducto = () => {
  const conteo: { [nombre: string]: number } = {};

  pedidos.map(pedido => {
    pedido.items.map(item => {
      const nombre = item.producto.nombre;
      conteo[nombre] = (conteo[nombre] || 0) + item.cantidad;
    });
  });

  return conteo;
};


export const obtenerProductoMasVendido = () => {
  const conteo = obtenerCantidadVendidaPorProducto();

  const lista = Object.keys(conteo).map(nombre => ({
    nombre: nombre,
    cantidad: conteo[nombre]
  }));

  if (lista.length === 0) return null;

  const ordenados = [...lista].sort((a, b) => b.cantidad - a.cantidad);
  return ordenados[0];
};