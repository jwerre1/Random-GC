const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to db")
);

app.listen(3000, () => console.log("server running"));