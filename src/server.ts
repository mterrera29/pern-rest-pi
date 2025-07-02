import express from 'express';

const server = express();

server.get('/', (req, res) => {
  res.send('holaaa pibe');
});

export default server;
