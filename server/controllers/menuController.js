const pool = require("../config/db");

// ===============================
// GET MENU
// ===============================
exports.getMenuItems = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM menu_items ORDER BY category, name"
    );

    res.json({
      success: true,
      menu: rows,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

// ===============================
// ADD MENU ITEM
// ===============================
exports.addMenuItem = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      available,
    } = req.body;

    // Convert true/false to 1/0
    const availableValue =
      available === "true" ||
      available === true ||
      available == 1
        ? 1
        : 0;

    const image = req.file ? req.file.filename : null;

    await pool.query(
      `
      INSERT INTO menu_items
      (
        name,
        category,
        price,
        available,
        image
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        name,
        category,
        price,
        availableValue,
        image,
      ]
    );

    res.json({
      success: true,
      message: "Menu item added successfully",
    });

  } catch (err) {
    console.error("ADD MENU ERROR:");
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
      stack: err.stack,
    });
  }
};

// ===============================
// UPDATE MENU ITEM
// ===============================
exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      category,
      price,
      available,
    } = req.body;

    const availableValue =
      available === "true" ||
      available === true ||
      available == 1
        ? 1
        : 0;

    if (req.file) {
      const image = req.file.filename;

      await pool.query(
        `
        UPDATE menu_items
        SET
          name=?,
          category=?,
          price=?,
          available=?,
          image=?
        WHERE id=?
        `,
        [
          name,
          category,
          price,
          availableValue,
          image,
          id,
        ]
      );

    } else {

      await pool.query(
        `
        UPDATE menu_items
        SET
          name=?,
          category=?,
          price=?,
          available=?
        WHERE id=?
        `,
        [
          name,
          category,
          price,
          availableValue,
          id,
        ]
      );
    }

    res.json({
      success: true,
      message: "Menu updated successfully",
    });

  } catch (err) {
    console.error("UPDATE MENU ERROR:");
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
      stack: err.stack,
    });
  }
};

// ===============================
// DELETE MENU ITEM
// ===============================
exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM menu_items WHERE id=?",
      [id]
    );

    res.json({
      success: true,
      message: "Menu item deleted successfully",
    });

  } catch (err) {
    console.error("DELETE MENU ERROR:");
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
      stack: err.stack,
    });
  }
};