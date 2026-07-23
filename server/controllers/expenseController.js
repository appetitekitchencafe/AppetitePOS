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