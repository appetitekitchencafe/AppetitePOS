const pool = require("../config/db");

exports.getDashboard = async (req, res) => {
  try {
    // =========================
    // Menu Statistics
    // =========================

    const [[menu]] = await pool.query(`
      SELECT COUNT(*) AS total
      FROM menu_items
    `);

    const [[available]] = await pool.query(`
      SELECT COUNT(*) AS total
      FROM menu_items
      WHERE available = TRUE
    `);

    // =========================
    // Today's Orders
    // =========================

    const [[orders]] = await pool.query(`
      SELECT COUNT(*) AS total
      FROM orders
      WHERE DATE(created_at)=CURDATE()
    `);

    // =========================
    // Today's Revenue
    // =========================

    const [[sales]] = await pool.query(`
      SELECT IFNULL(SUM(grand_total),0) AS total
      FROM orders
      WHERE DATE(created_at)=CURDATE()
    `);

    // =========================
    // Average Bill
    // =========================

    const [[average]] = await pool.query(`
      SELECT IFNULL(AVG(grand_total),0) AS average
      FROM orders
      WHERE DATE(created_at)=CURDATE()
    `);

    // =========================
    // Weekly Sales
    // =========================

    const [weeklySales] = await pool.query(`
      SELECT
        DATE(created_at) AS day,
        SUM(grand_total) AS total
      FROM orders
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
      GROUP BY DATE(created_at)
      ORDER BY day ASC
    `);

    // =========================
    // Payment Breakdown
    // =========================

    const [paymentBreakdown] = await pool.query(`
      SELECT
        payment_method,
        COUNT(*) AS total
      FROM orders
      GROUP BY payment_method
    `);

    // =========================
    // Top Selling Items
    // =========================

    const [topItems] = await pool.query(`
      SELECT
        m.name,
        SUM(oi.quantity) AS sold
      FROM order_items oi
      JOIN menu_items m
      ON oi.menu_item_id = m.id
      GROUP BY oi.menu_item_id
      ORDER BY sold DESC
      LIMIT 5
    `);

    res.json({
      success: true,

      totalMenu: menu.total,

      availableItems: available.total,

      todayOrders: orders.total,

      todaySales: Number(sales.total),

      averageBill: Number(average.average).toFixed(2),

      weeklySales,

      paymentBreakdown,

      topItems,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};