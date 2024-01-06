require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.3yrrfpg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);
const morgan = require('morgan');
app.use(morgan('combined'));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const gamesRoutes = require('./api/routes/games');
app.use('/games', gamesRoutes);
const userRoutes = require('./api/routes/users');
app.use('/users', userRoutes);
 
app.use((req, res, next) => {
  res.status(200).json({ info: 'Done' });
});
 
module.exports = app;