import { Router } from 'express';
import { getFacturacion, getMasVendido} from '../controllers/reportes.controller';

const router = Router();
// GET /pedidos/reportes/facturacion -> Devuelve cuánto se facturó
// Lo ponemos ARRIBA de '/:id' para que Express no confunda "reportes" con un ID
router.get('/reportes/facturacion', getFacturacion);

// GET /pedidos/reportes/mas-vendido -> Devuelve el producto más vendido
router.get('/pedidos/reportes/mas-vendido', getMasVendido);

export default router;