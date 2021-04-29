const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')

const talksRoutes = require('./routes/talks');
const searchRoutes = require('./routes/search');
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

app.use('/talks', talksRoutes);
app.use('/search', searchRoutes);

app.listen(3000, () => console.log("server running"));