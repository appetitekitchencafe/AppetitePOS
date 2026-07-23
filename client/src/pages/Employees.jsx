import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import EmployeeForm from "../components/staff/EmployeeForm";
import EmployeeTable from "../components/staff/EmployeeTable";
import api from "../services/api";
import "../styles/employees.css";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await api.get("/employees");

      if (res.data.success) {
        setEmployees(res.data.employees);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveEmployee = async (employee) => {
    try {
      const res = await api.post("/employees", employee);

      if (res.data.success) {
        alert("Employee Added Successfully");
        loadEmployees();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add employee");
    }
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      const res = await api.delete(`/employees/${id}`);

      if (res.data.success) {
        loadEmployees();
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="page-title">
        👨‍💼 Staff Management
      </h1>

      <EmployeeForm onSave={saveEmployee} />

      <EmployeeTable
        employees={employees}
        onDelete={deleteEmployee}
      />
    </DashboardLayout>
  );
}