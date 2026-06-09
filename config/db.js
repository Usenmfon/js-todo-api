const mongoose = require('mongoose');

let cachedConnection = null;
let connectionPromise = null;

mongoose.set('bufferCommands', false);

const connectDB = async () => {
  if (cachedConnection && cachedConnection.connection.readyState === 1) {
    return cachedConnection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  const mongoUri = process.env.MONGO_MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGO_MONGODB_URI is not defined in the environment');
  }

  connectionPromise = mongoose
    .connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    })
    .then((connection) => {
      cachedConnection = connection;
      console.log(`MongoDB connected: ${connection.connection.host}`);
      return connection;
    })
    .catch((error) => {
      cachedConnection = null;
      console.error(`MongoDB connection error: ${error.message}`);
      throw error;
    })
    .finally(() => {
      connectionPromise = null;
    });

  return connectionPromise;
};

module.exports = connectDB;
