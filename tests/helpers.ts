import { getAll } from '../src/services/producto.service';
import { Expreso } from '../src/models/cafeExpreso';
import { Filtrado } from '../src/models/cafeFiltrado';
import { Pasteleria } from '../src/models/pasteleria';
import { Producto } from '../src/models/Producto';
import { tamaño, variedad } from '../src/models/types';

// Buscan productos reales del catálogo, así los tests no dependen de ids fijos.
export const buscarExpreso = (v: variedad, t: tamaño): Producto =>
  getAll().find((p) => p instanceof Expreso && p.variedad === v && p.tamaño === t)!;

export const buscarFiltrado = (v: variedad, t: tamaño): Producto =>
  getAll().find((p) => p instanceof Filtrado && p.variedad === v && p.tamaño === t)!;

export const buscarPasteleria = (precio: number): Producto =>
  getAll().find((p) => p instanceof Pasteleria && p.precioBase === precio)!;
