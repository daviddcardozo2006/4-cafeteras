import { describe, test, expect } from 'vitest';
import { getAll, getById } from '../../src/services/producto.service';
import { Expreso } from '../../src/models/cafeExpreso';
import { Filtrado } from '../../src/models/cafeFiltrado';
import { Pasteleria } from '../../src/models/pasteleria';

describe('producto.service', () => {
  describe('getAll', () => {
    test('devuelve los 20 productos del catálogo (9 expresos, 9 filtrados y 2 de pastelería)', () => {
      const productos = getAll();
      expect(productos).toHaveLength(20);
      expect(productos.filter((p) => p instanceof Expreso)).toHaveLength(9);
      expect(productos.filter((p) => p instanceof Filtrado)).toHaveLength(9);
      expect(productos.filter((p) => p instanceof Pasteleria)).toHaveLength(2);
    });

    test('los ids son únicos', () => {
      const ids = getAll().map((p) => p.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    test('todos los productos tienen un precio válido', () => {
      for (const producto of getAll()) {
        const precio = producto.calcularPrecio();
        expect(precio).not.toBeNaN();
        expect(precio).toBeGreaterThan(0);
      }
    });
  });

  describe('getById', () => {
    test('devuelve el producto con ese id', () => {
      const producto = getById(1);
      expect(producto).toBeDefined();
      expect(producto?.id).toBe(1);
    });

    test('devuelve undefined si el id no existe', () => {
      expect(getById(9999)).toBeUndefined();
    });
  });

  describe('precios del catálogo según la tabla', () => {
    test('expreso pocillo Brasil cuesta 5020', () => {
      const cafe = getAll().find(
        (p) => p instanceof Expreso && p.tamaño === 'POCILLO' && p.variedad === 'BRASIL'
      );
      expect(cafe?.calcularPrecio()).toBe(5020);
    });

    test('filtrado taza grande Etiopía cuesta 9200', () => {
      const cafe = getAll().find(
        (p) => p instanceof Filtrado && p.tamaño === 'TAZA GRANDE' && p.variedad === 'ETIOPIA'
      );
      expect(cafe?.calcularPrecio()).toBe(9200);
    });

    test('la pastelería tiene los precios que corresponden de la tabla', () => {
      const precios = getAll()
        .filter((p) => p instanceof Pasteleria)
        .map((p) => p.calcularPrecio())
        .sort((a, b) => a - b);
      expect(precios).toEqual([2500, 4200]);
    });
  });
});
