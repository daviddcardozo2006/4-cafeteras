import { Expreso } from '../models/cafeExpreso';
import { Filtrado } from '../models/cafeFiltrado';
import { Pasteleria } from '../models/pasteleria';
import { Producto } from '../models/Producto';
import { tamaño, variedad } from '../models/types';

const variedades: variedad[] = ['BRASIL', 'COLOMBIA', 'ETIOPIA'];
const tamaños: tamaño[] = ['POCILLO', 'MEDIANO', 'TAZA GRANDE'];

let idCounter = 1; // inicializamos el counter en 1

const expresos : Expreso [] = [] ; // creo un array vacio y utilizamos doble bucle for asi pasamos por todas las variedades y tamaños 
for (const tam of tamaños){
    for (const varz of variedades){
expresos.push (new Expreso(idCounter++, varz,tam));
    }
}
const filtrados : Filtrado [] = [] ; // creo un array vacio y utilizamos doble bucle for asi pasamos por todas las variedades y tamaños 
for (const tam of tamaños){
    for (const varz of variedades){
filtrados.push (new Filtrado (idCounter++, varz,tam));
    }
}
const pasteleria : Pasteleria [] = [
    new Pasteleria(idCounter++, 'Muffins de chocolate', 2500),
    new Pasteleria(idCounter++, 'Porción de torta selva negra', 4200),

];

export const productos: Producto[] = [...expresos, ...filtrados, ...pasteleria];
export const getAll = (): Producto [] => productos;

export const getById = (id: number): Producto | undefined => { // recorremos todo el array id x id y si no se encuentra el producto devuelve undefined
     return productos.find((p) => p.id === id);

     }