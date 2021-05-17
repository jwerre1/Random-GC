const path = require("path");
const express = require("express");

const talksController = require(path.join(__dirname, "../controllers/talks"));

const router = express.Router();

router.get("/", talksController.getAllTalks);

router.post("/search", talksController.getSearchTalks);

module.exports = router;
