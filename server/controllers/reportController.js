const pool = require("../config/db");

exports.getReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const from = startDate || "2000-01-01";
    const to = endDate || "2100-12-31";

    // Sales Summary
    const [sales] = await pool.query(
      `
      SELECT
        COUNT(*) AS totalOrders,
        IFNULL(SUM(grand_total),0) AS totalSales,
        IFNULL(AVG(grand_total),0) AS averageBill
      FROM orders
      WHERE DATE(created_at) BETWEEN ? AND ?
      AND status <> 'Cancelled'
      `,
      [from, to]
    );

    // Payment Breakdown
    const [payments] = await pool.query(
      `
      SELECT
        payment_method,
        COUNT(*) AS total
      FROM orders
      WHERE DATE(created_at) BETWEEN ? AND ?
      AND status <> 'Cancelled'
      GROUP BY payment_method
      `,
      [from, to]
    );

    // Top Selling Items
    const [topItems] = await pool.query(
      `
      SELECT
        menu_items.name,
        SUM(order_items.quantity) AS sold
      FROM order_items
      JOIN menu_items
        ON menu_items.id = order_items.menu_item_id
      JOIN orders
        ON orders.id = order_items.order_id
      WHERE DATE(orders.created_at) BETWEEN ? AND ?
      AND orders.status <> 'Cancelled'
      GROUP BY menu_items.id
      ORDER BY sold DESC
      LIMIT 10
      `,
      [from, to]
    );

    res.json({
      success: true,
      summary: sales[0],
      payments,
      topItems,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};