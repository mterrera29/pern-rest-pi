import express from 'express';
import router from './router';
import db from './config/db';
import colors from 'colors';

async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.blue('Conexión exitosa de BBDD'));
  } catch (error) {
    console.log(colors.red(error));
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
