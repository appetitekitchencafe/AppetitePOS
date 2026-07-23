const pool = require("../config/db");

// Get all active kitchen orders
exports.getKitchenOrders = async (req, res) => {
  try {
    const [orders] = await pool.query(`
      SELECT
        id,
        order_number,
        grand_total,
        payment_method,
        status,
        created_at
      FROM orders
      WHERE status != 'Ready'
      ORDER BY created_at ASC
    `);

    for (const order of orders) {
      const [items] = await pool.query(
        `
        SELECT
          mi.name,
          oi.quantity
        FROM order_items oi
        JOIN menu_items mi
          ON oi.menu_item_id = mi.id
        WHERE oi.order_id = ?
        `,
        [order.id]
      );

      order.items = items;
    }

    res.json({
      success: true,
      orders,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to load kitchen orders.",
    });
  }
};

// Update kitchen order status
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await pool.query(
      `
      UPDATE orders
      SET status = ?
      WHERE id = ?
      `,
      [status, id]
    );

    res.json({
      success: true,
      message: "Order updated successfully.",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to update order.",
    });
  }
};