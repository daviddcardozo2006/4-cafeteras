import { Router } from 'express';
import { obtenerProductos, obtenerProductoPorId } from '../controllers/producto.controller';

const router = Router();

// GET /productos -> Muestra una lista de todos los productos
router.get('/productos', obtenerProductos);

// GET /productos/:id -> Devuelve el producto pedido según id
router.get('/productos/:id', obtenerProductoPorId);

export default router;