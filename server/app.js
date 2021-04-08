const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')

const talksRoutes = require('./routes/talks');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to db")
);

app.use(talksRoutes);

app.listen(3000, () => console.log("server running"));