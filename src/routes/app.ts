import express from 'express';
import productoRoutes from './routes/producto.routes';
import pedidoRoutes from './routes/pedido.routes';
import reportesRoutes from './routes/reportes.routes';

const app = express();
const PORT = 3000;

// Middleware para que Express entienda el body en formato JSON (necesario para el POST)
app.use(express.json());

// Conectamos las rutas
app.use('/productos', productoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/reportes',reportesRoutes);

// Levantamos el servidor
app.listen(PORT, () => {
  console.log( "Servidor de Cafetería Origen corriendo en http://localhost:${PORT}");
});