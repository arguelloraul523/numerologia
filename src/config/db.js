const mongoose = require('mongoose');

async function connectDB() {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error('MONGO_URI no está definida en el archivo .env');
    }

    await mongoose.connect(uri);

    console.log('MongoDB conectado correctamente');
    console.log('Base de datos:', mongoose.connection.db.databaseName);
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
