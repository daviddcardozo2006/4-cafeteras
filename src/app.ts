import express from 'express';
import productoRoutes from './routes/producto.routes';
import pedidoRoutes from './routes/pedido.routes';
import reportesRoutes from './routes/reportes.routes';

// La app se arma y se exporta acá, sin levantar el servidor:
// así Supertest la puede importar en los tests.
export const app = express();

// Para que Express entienda el body en formato JSON (necesario para el POST)
app.use(express.json());

// Cada router define sus rutas relativas a este prefijo
app.use('/productos', productoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/reportes', reportesRoutes);
