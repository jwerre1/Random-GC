const express = require("express");

const talksController = require("../controllers/talks");

const router = express.Router();

router.get("/", talksController.getAllTalks);

router.post("/search", talksController.getSearchTalks);

module.exports = router;
