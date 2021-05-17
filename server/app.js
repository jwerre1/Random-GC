const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const talksRoutes = require(path.join(__dirname, "./routes/talks"));
const searchRoutes = require(path.join(__dirname, "./routes/search"));
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to db")
);

app.use("/talks", talksRoutes);
app.use("/search", searchRoutes);

app.listen(port, () => console.log("server running"));
