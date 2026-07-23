const pool = require("../config/db");

/*
=========================================
GET ALL PURCHASES
=========================================
*/
exports.getPurchases = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        p.id,
        p.invoice_number,
        p.purchase_date,
        p.total,
        s.supplier_name
      FROM purchases p
      JOIN suppliers s
      ON p.supplier_id = s.id
      ORDER BY p.id DESC
    `);

    res.json({
      success: true,
      purchases: rows,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/*
=========================================
GET SUPPLIERS
=========================================
*/
exports.getSuppliers = async (req, res) => {
  try {

    const [rows] = await pool.query(`
      SELECT *
      FROM suppliers
      ORDER BY supplier_name
    `);

    res.json({
      success: true,
      suppliers: rows,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

/*
=========================================
ADD SUPPLIER
=========================================
*/
exports.addSupplier = async (req, res) => {

  try {

    const {
      supplier_name,
      phone,
      email,
      address,
    } = req.body;

    await pool.query(
      `
      INSERT INTO suppliers
      (
        supplier_name,
        phone,
        email,
        address
      )
      VALUES (?,?,?,?)
      `,
      [
        supplier_name,
        phone,
        email,
        address,
      ]
    );

    res.json({
      success: true,
      message: "Supplier Added",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

/*
=========================================
CREATE PURCHASE
=========================================
*/
exports.createPurchase = async (req, res) => {

  const connection = await pool.getConnection();

  try {

    const {
      supplier_id,
      invoice_number,
      purchase_date,
      items,
    } = req.body;

    await connection.beginTransaction();

    let grandTotal = 0;

    items.forEach(item => {
      grandTotal += item.quantity * item.purchase_price;
    });

    const [purchaseResult] = await connection.query(
      `
      INSERT INTO purchases
      (
        supplier_id,
        invoice_number,
        purchase_date,
        total
      )
      VALUES (?,?,?,?)
      `,
      [
        supplier_id,
        invoice_number,
        purchase_date,
        grandTotal,
      ]
    );

    const purchaseId = purchaseResult.insertId;

    for (const item of items) {

      const total =
        item.quantity *
        item.purchase_price;

      await connection.query(
        `
        INSERT INTO purchase_items
        (
          purchase_id,
          inventory_item_id,
          quantity,
          purchase_price,
          total
        )
        VALUES (?,?,?,?,?)
        `,
        [
          purchaseId,
          item.inventory_item_id,
          item.quantity,
          item.purchase_price,
          total,
        ]
      );

      await connection.query(
        `
        UPDATE inventory
        SET stock = stock + ?
        WHERE id = ?
        `,
        [
          item.quantity,
          item.inventory_item_id,
        ]
      );

    }

    await connection.commit();

    res.json({
      success: true,
      message: "Purchase Saved",
    });

  } catch (err) {

    await connection.rollback();

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  } finally {

    connection.release();

  }

};