// Fase 1: punto de entrada. Conecta a Mongo y luego levanta Express.
// Fase 5: se agrega el manejo de unhandledRejection para que un error
// asincrono no capturado no tumbe el servidor en silencio.
require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 4000;

async function iniciar() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});

iniciar();
