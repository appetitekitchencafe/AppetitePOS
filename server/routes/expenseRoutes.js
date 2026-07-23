const express = require("express");

const router = express.Router();

const {
  getExpenses,
  addExpense,
} = require("../controllers/expenseController");

// Get all expenses
router.get("/", getExpenses);

// Add new expense
router.post("/", addExpense);

module.exports = router;