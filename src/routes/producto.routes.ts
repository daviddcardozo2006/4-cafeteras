import { Router } from 'express';
import { obtenerProductos, obtenerProductoPorId } from '../controllers/producto.controller';

const router = Router();

// Montado en /productos (ver app.ts)
// GET /productos -> Muestra una lista de todos los productos
router.get('/', obtenerProductos);

// GET /productos/:id -> Devuelve el producto pedido según id
router.get('/:id', obtenerProductoPorId);

export default router;
