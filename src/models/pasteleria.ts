import { Producto } from './Producto';

export class Pasteleria extends Producto {
    constructor(
        id: number,
        nombre: string,
        precioBase: number
    ){
    super(id, nombre, precioBase);
    }
    calcularPrecio(): number {
    return this.precioBase;
    }
}
