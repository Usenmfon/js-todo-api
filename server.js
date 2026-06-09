const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Todo API is running',
  });
});

const ensureDBConnected = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    error.statusCode = 503;
    error.message =
      'Database connection failed. Make sure MongoDB is running and MONGO_MONGODB_URI is correct.';
    next(error);
  }
};

app.use('/api/todos', ensureDBConnected, todoRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use((error, req, res, next) => {
  const statusCode =
    error.statusCode || (error.name === 'ValidationError' ? 400 : 500);

  res.status(statusCode).json({
    success: false,
    message: error.message || 'Server error',
  });
});

const startServer = async () => {
  await connectDB();

  const port = process.env.PORT;

  if (!port) {
    throw new Error('PORT is not defined in the environment');
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

if (require.main === module) {
  startServer().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}

module.exports = app;
