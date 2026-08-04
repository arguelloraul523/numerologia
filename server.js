require('dotenv').config();

const express = require('express');
const connectDB = require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API de Numerología funcionando ',
  });
});

async function iniciar() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
  });
}


process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});

iniciar();
