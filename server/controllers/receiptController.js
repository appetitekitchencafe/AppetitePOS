const pool = require("../config/db");

exports.getReceipt = async (req, res) => {
  try {

    const { id } = req.params;

    const [orders] = await pool.query(
      `
      SELECT *
      FROM orders
      WHERE id=?
      `,
      [id]
    );

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const [items] = await pool.query(
      `
      SELECT
      mi.name,
      oi.quantity,
      oi.price

      FROM order_items oi

      JOIN menu_items mi
      ON mi.id=oi.menu_item_id

      WHERE oi.order_id=?
      `,
      [id]
    );

    res.json({
      success: true,
      order: orders[0],
      items,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};