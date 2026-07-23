const pool = require("../config/db");

// Get all orders
exports.getOrders = async (req, res) => {
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
      ORDER BY created_at DESC
    `);

    for (const order of orders) {
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
      message: "Server Error",
    });

  }
};

// Cancel Order
exports.cancelOrder = async (req, res) => {
  try {

    await pool.query(
      `
      UPDATE orders
      SET status='Cancelled'
      WHERE id=?
      `,
      [req.params.id]
    );

    res.json({
      success: true,
      message: "Order Cancelled",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};