const pool = require("../config/db");

// ============================
// GET ALL EMPLOYEES
// ============================
exports.getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT *
      FROM employees
      ORDER BY id DESC
    `);

    res.json({
      success: true,
      employees: rows,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ============================
// ADD EMPLOYEE
// ============================
exports.addEmployee = async (req, res) => {
  try {
    const {
      employee_code,
      full_name,
      phone,
      email,
      role,
      salary,
      shift,
      joining_date,
    } = req.body;

    await pool.query(
      `
      INSERT INTO employees
      (
        employee_code,
        full_name,
        phone,
        email,
        role,
        salary,
        shift,
        joining_date
      )
      VALUES (?,?,?,?,?,?,?,?)
      `,
      [
        employee_code,
        full_name,
        phone,
        email,
        role,
        salary,
        shift,
        joining_date,
      ]
    );

    res.json({
      success: true,
      message: "Employee Added Successfully",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ============================
// DELETE EMPLOYEE
// ============================
exports.deleteEmployee = async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM employees WHERE id=?",
      [req.params.id]
    );

    res.json({
      success: true,
      message: "Employee Deleted",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};