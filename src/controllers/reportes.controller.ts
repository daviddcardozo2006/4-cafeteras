import { Request, Response } from 'express';
import { getAllPedidos } from '../services/pedido.service';
import { facturacionTotal, masVendido } from '../services/reporte.service';

// GET /reportes/facturacion -> Devuelve cuánto se facturó
export const getFacturacion = (req: Request, res: Response) => {
  res.json({ total: facturacionTotal(getAllPedidos()) });
};

// GET /reportes/mas-vendido -> Devuelve el producto más vendido
export const getMasVendido = (req: Request, res: Response) => {
  const resultado = masVendido(getAllPedidos());

  if (!resultado) {
    res.status(404).json({ mensaje: 'Todavía no hay ventas' });
    return;
  }

  res.json(resultado);
};
