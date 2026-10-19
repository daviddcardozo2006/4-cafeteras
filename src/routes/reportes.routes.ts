import { Router } from 'express';
import { getFacturacion, getMasVendido } from '../controllers/reportes.controller';

const router = Router();

// Montado en /reportes (ver app.ts)
// GET /reportes/facturacion -> Devuelve cuánto se facturó
router.get('/facturacion', getFacturacion);

// GET /reportes/mas-vendido -> Devuelve el producto más vendido
router.get('/mas-vendido', getMasVendido);

export default router;
