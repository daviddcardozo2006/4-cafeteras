
export abstract class Producto {
  constructor(
    public id: number,
    public nombre: string,
    public precioBase: number
  ) {}
 abstract calcularPrecio(): number;
} 
