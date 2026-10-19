import { Pedido } from '../models/pedido';

export class PedidoService {
  constructor(private pedidos: Pedido[] = []) {}

  
  calcularFacturacionTotal(): number {
    return this.pedidos.reduce((acumulador, actual) => acumulador + actual.calcularTotal(), 0);
  }

  
  obtenerCantidadVendidaPorProducto() {
    let ventas: { nombre: string; cantidad: number }[] = [];

    this.pedidos.map(pedido => {
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
  }

  obtenerProductoMasVendido() {
    let ventas = this.obtenerCantidadVendidaPorProducto();

    let ordenados = [...ventas].sort((a, b) => b.cantidad - a.cantidad);

    return ordenados[0];
  }
}