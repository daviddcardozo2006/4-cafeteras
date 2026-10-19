import { Request, Response } from 'express';
import { crearPedido, getAllPedidos, getPedidoById } from '../services/pedido.service';
import { Pedido } from '../models/pedido';

// Todas las respuestas de pedidos incluyen el total calculado
const conTotal = (pedido: Pedido) => ({
  ...pedido,
  total: pedido.calcularTotal(),
});

// POST /pedidos -> Devuelve el pedido con su total calculado
export const postPedido = (req: Request, res: Response) => {
  try {
    const nuevoPedido = crearPedido(req.body?.items);
    res.status(201).json(conTotal(nuevoPedido));
  } catch (error) {
    // El service lanza error si los datos son inválidos: eso es un 400
    res.status(400).json({ mensaje: (error as Error).message });
  }
};

// GET /pedidos -> Lista de pedidos de todas las mesas
export const getPedidos = (req: Request, res: Response) => {
  res.json(getAllPedidos().map(conTotal));
};

// GET /pedidos/:id -> Pedido de tal mesa
export const getPedido = (req: Request, res: Response) => {
  const pedido = getPedidoById(Number(req.params.id));

  if (!pedido) {
    res.status(404).json({ mensaje: 'Pedido no encontrado' });
    return;
  }

  res.json(conTotal(pedido));
};
