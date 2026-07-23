const pool = require("../config/db");

// Get all inventory
exports.getInventory = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT *
      FROM inventory
      ORDER BY name
    `);

    res.json({
      success: true,
      inventory: rows,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to load inventory.",
    });
  }
};

// Add stock
exports.addStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    await pool.query(
      `
      UPDATE inventory
      SET stock = stock + ?
      WHERE id = ?
      `,
      [quantity, id]
    );

    res.json({
      success: true,
      message: "Stock updated successfully.",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to update stock.",
    });
  }
};