import express from 'express';
import router from './router';
import db from './config/db';
import colors from 'colors';

export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.blue('Conexión exitosa de BBDD'));
  } catch (error) {
    console.log(colors.red.bold('Hubo un error al conectar a la DB'));
  }
}

connectDB();

const server = express();

server.use(express.json());

server.use('/', router);

server.get('/api', (req, res) => {
  res.json({ data: 'Desde API' });
});
export default server;
