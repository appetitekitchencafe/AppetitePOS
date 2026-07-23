import { useState, useEffect } from "react";
import axios from "axios";

export default function Settings() {
  const [form, setForm] = useState({
    category: "",
    description: "",
    amount: "",
    payment_method: "",
    created_by: 1,
  });

  const [expenses, setExpenses] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const loadExpenses = async () => {
    try {
      const res = await axios.get("http://appetitepos-production.up.railway.app/api/expenses");

      if (res.data.success) {
        setExpenses(res.data.expenses);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load expenses");
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const saveExpense = async () => {
    try {
      const res = await axios.post(
        "https://appetitepos-production.up.railway.app",
        form
      );

      alert(res.data.message);

      setForm({
        category: "",
        description: "",
        amount: "",
        payment_method: "",
        created_by: 1,
      });

      loadExpenses();
    } catch (err) {
      console.error(err);
      alert("Failed to save expense");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Expense Management</h1>

      <div
        style={{
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />

        <input
          type="text"
          name="payment_method"
          placeholder="Payment Method"
          value={form.payment_method}
          onChange={handleChange}
        />

        <button onClick={saveExpense}>
          Save Expense
        </button>
      </div>

      <hr />

      <h2>Expense List</h2>

      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        width="100%"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Payment Method</th>
          </tr>
        </thead>

        <tbody>
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.id}</td>
                <td>{expense.category}</td>
                <td>{expense.description}</td>
                <td>₹{expense.amount}</td>
                <td>{expense.payment_method}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" align="center">
                No expenses found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}