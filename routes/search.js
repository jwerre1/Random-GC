const path = require("path");
const express = require("express");

const searchController = require(path.join(__dirname, "../controllers/search"));

const router = express.Router();

router.get("/", searchController.getSearchParams);

module.exports = router;
