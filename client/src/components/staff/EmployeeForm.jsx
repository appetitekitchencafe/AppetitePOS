import { useState } from "react";

export default function EmployeeForm({ onSave }) {
  const [form, setForm] = useState({
    employee_code: "",
    full_name: "",
    phone: "",
    email: "",
    role: "Cashier",
    salary: "",
    shift: "Morning",
    joining_date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      !form.employee_code ||
      !form.full_name ||
      !form.salary
    ) {
      alert("Please fill all required fields.");
      return;
    }

    onSave(form);

    setForm({
      employee_code: "",
      full_name: "",
      phone: "",
      email: "",
      role: "Cashier",
      salary: "",
      shift: "Morning",
      joining_date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="employee-form">

      <h2>Add Employee</h2>

      <div className="form-grid">

        <input
          name="employee_code"
          placeholder="Employee Code"
          value={form.employee_code}
          onChange={handleChange}
        />

        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option>Admin</option>
          <option>Manager</option>
          <option>Cashier</option>
          <option>Kitchen</option>
        </select>

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
        />

        <select
          name="shift"
          value={form.shift}
          onChange={handleChange}
        >
          <option>Morning</option>
          <option>Evening</option>
          <option>Night</option>
        </select>

        <input
          type="date"
          name="joining_date"
          value={form.joining_date}
          onChange={handleChange}
        />

      </div>

      <button
        className="save-btn"
        onClick={handleSubmit}
      >
        Add Employee
      </button>

    </div>
  );
}