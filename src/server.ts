import express from 'express';
import router from './router';
import db from './config/db';

async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log('conexion exitosa');
  } catch (error) {
    console.log(error);
  }
}

connectDB();

const server = express();

server.use('/', router);
export default server;
