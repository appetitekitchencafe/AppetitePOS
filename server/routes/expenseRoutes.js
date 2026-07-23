const express = require("express");

const router = express.Router();

const {
  getExpenses,
} = require("../controllers/expenseController");

router.get("/", getExpenses);

module.exports = router;