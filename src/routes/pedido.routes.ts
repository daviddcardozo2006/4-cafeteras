import { Router } from 'express';
import { postPedido, getPedidos, getPedido } from '../controllers/pedido.controller';

const router = Router();

// Montado en /pedidos (ver app.ts)
// GET /pedidos -> Lista de pedidos de todas las mesas
router.get('/', getPedidos);

// POST /pedidos -> Devuelve el pedido con su total calculado
router.post('/', postPedido);

// GET /pedidos/:id -> Pedido de tal mesa
router.get('/:id', getPedido);

export default router;
