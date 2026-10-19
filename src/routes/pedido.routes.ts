import { Router } from 'express';
import { postPedido, getPedidos, getPedido, getFacturacion, getMasVendido } from '../controllers/pedido.controller';

const router = Router();

// GET /pedidos -> Lista de pedidos de todas las mesas
router.get('/pedidos', getPedidos);

// POST /pedidos -> Devuelve el pedido con su total calculado
router.post('/pedidos', postPedido);

// GET /pedidos/:id -> Pedido de tal mesa
router.get('/pedidos/:id', getPedido);

export default router;