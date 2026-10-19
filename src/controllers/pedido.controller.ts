import { Request, Response } from 'express';
import {
  crearPedido,
  getAllPedidos,
  getPedidoById,
  calcularFacturacionTotal,
  obtenerProductoMasVendido
} from '../services/pedidoServices';

// POST /pedidos -> Devuelve el pedido con su total calculado
export const postPedido = (req: Request, res: Response) => {
  const { items } = req.body;
  const nuevoPedido = crearPedido(items);

  res.status(201).json({
    ...nuevoPedido,
    total: nuevoPedido.calcularTotal()
  });
};

// GET /pedidos -> Lista de pedidos de todas las mesas
export const getPedidos = (req: Request, res: Response) => {
  res.json(getAllPedidos());
};

// GET /pedidos/:id -> Pedido de tal mesa
export const getPedido = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const pedido = getPedidoById(id);

  if (!pedido) {
    return res.status(404).json({ mensaje: 'Pedido no encontrado' });
  }

  res.json({
    ...pedido,
    total: pedido.calcularTotal()
  });
};

// GET /reportes/facturacion -> Devuelve cuánto se facturó
export const getFacturacion = (req: Request, res: Response) => {
  const total = calcularFacturacionTotal();
  res.json({ facturacionTotal: total });
};

// GET /reportes/mas-vendido -> Devuelve el producto más vendido
export const getMasVendido = (req: Request, res: Response) => {
  const masVendido = obtenerProductoMasVendido();
  res.json(masVendido);
};