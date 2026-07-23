const pool = require("../config/db");

// Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM expenses ORDER BY created_at DESC"
    );

    res.json({
      success: true,
      expenses: rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch expenses",
    });
  }
};
// Add Expense
exports.addExpense = async (req, res) => {
  try {

    const {
      category,
      description,
      amount,
      payment_method,
      created_by
    } = req.body;

    // Validation
    if (!category || !amount) {
      return res.status(400).json({
        success: false,
        message: "Category and Amount are required"
      });
    }

    const [result] = await pool.query(
      `INSERT INTO expenses
      (category, description, amount, payment_method, created_by)
      VALUES (?, ?, ?, ?, ?)`,
      [
        category,
        description,
        amount,
        payment_method,
        created_by
      ]
    );

    res.status(201).json({
      success: true,
      message: "Expense added successfully",
      expenseId: result.insertId
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to add expense"
    });

  }
};