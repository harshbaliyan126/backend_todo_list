require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/ping', require('./routes/ping'));
app.use('/api/task', require('./routes/task'));

app.use(errorHandler);

const PORT = process.env.PORT || 3500;

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
