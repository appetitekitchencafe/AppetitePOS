const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

console.log("dashboardController =", dashboardController);

router.get("/", dashboardController.getDashboard);

module.exports = router;