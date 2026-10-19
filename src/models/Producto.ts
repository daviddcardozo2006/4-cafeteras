export abstract class Producto {
  constructor(
    public id: number,
    public nombre: string,
    public variedad: string,
    public precioBase: number
  ) {}

  abstract calcularPrecio(): number;
}