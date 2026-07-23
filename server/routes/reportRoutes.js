const express = require("express");
const router = express.Router();

const { getReport } = require("../controllers/reportController");

// GET /api/reports
router.get("/", getReport);

module.exports = router;