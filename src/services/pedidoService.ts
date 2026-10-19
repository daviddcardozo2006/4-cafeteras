import { Pedido } from '../models/pedido';
import { ItemPedido } from '../models/ItemPedido';
import { getById } from './producto.service';

const pedidos: Pedido[] = [];
let pedidoIdCounter = 1;


export const crearPedido = (itemsInput: { productoId: number; cantidad: number }[]): Pedido => {
  const items: ItemPedido[] = [];

  itemsInput.map(item => {
    const producto = getById(item.productoId);
    if (producto) {
      items.push(new ItemPedido(producto, item.cantidad));
    }
  });

  const nuevoPedido = new Pedido(pedidoIdCounter++, items, 'pendiente');
  pedidos.push(nuevoPedido);
  return nuevoPedido;
};


export const getAllPedidos = (): Pedido[] => {
  return pedidos;
};


export const getPedidoById = (id: number): Pedido | undefined => {
  return pedidos.find(p => p.id === id);
};


export const calcularFacturacionTotal = (): number => {
  return pedidos.reduce((acumulador, actual) => acumulador + actual.calcularTotal(), 0);
};


export const obtenerCantidadVendidaPorProducto = () => {
  let ventas: { nombre: string; cantidad: number }[] = [];

  pedidos.map(pedido => {
    pedido.items.map(item => {
      
      let encontrado = ventas.find(v => v.nombre === item.producto.nombre);

      if (encontrado) {
        encontrado.cantidad += item.cantidad; 
      } else {
        ventas.push({ nombre: item.producto.nombre, cantidad: item.cantidad }); 
      }
    });
  });

  return ventas; 
};


export const obtenerProductoMasVendido = () => {
  let ventas = obtenerCantidadVendidaPorProducto();

  if (ventas.length === 0) return null;

  
  let ordenados = [...ventas].sort((a, b) => b.cantidad - a.cantidad);

  
  return ordenados[0];
};