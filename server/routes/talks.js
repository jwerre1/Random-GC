const express = require('express');

const talksController = require('../controllers/talks');

const router = express.Router();

router.get('/talks', talksController.getAllTalks);

module.exports = router;