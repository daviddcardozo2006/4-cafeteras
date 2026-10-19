import { Request, Response } from 'express';
import { getAll, getById } from '../services/producto.service';


export const obtenerProductos = (req: Request, res: Response) => {
  const lista = getAll();
  res.json(lista);
};


export const obtenerProductoPorId = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const producto = getById(id);

  if (!producto) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  res.json({
    ...producto,
    precioFinal: producto.calcularPrecio()
  });
};