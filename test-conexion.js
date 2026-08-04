require('dotenv').config();
const mongoose = require('mongoose');


async function probar() {
  console.log('Intentando conectar a MongoDB Atlas...');
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(' Conexión exitosa a MongoDB Atlas');
    console.log(' Base de datos activa:', mongoose.connection.db.databaseName);
  } catch (error) {
    console.error(' Error al conectar:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

probar();
