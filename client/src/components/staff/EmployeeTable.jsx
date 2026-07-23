export default function EmployeeTable({
  employees,
  onDelete,
}) {
  return (
    <div className="employee-table">

      <h2>Employees</h2>

      <table>

        <thead>

          <tr>

            <th>Code</th>

            <th>Name</th>

            <th>Role</th>

            <th>Phone</th>

            <th>Shift</th>

            <th>Salary</th>

            <th>Status</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {employees.length === 0 ? (

            <tr>

              <td colSpan="8">
                No Employees Found
              </td>

            </tr>

          ) : (

            employees.map((emp) => (

              <tr key={emp.id}>

                <td>{emp.employee_code}</td>

                <td>{emp.full_name}</td>

                <td>{emp.role}</td>

                <td>{emp.phone}</td>

                <td>{emp.shift}</td>

                <td>
                  ₹{Number(emp.salary).toLocaleString()}
                </td>

                <td>

                  <span
                    className={
                      emp.status === "Active"
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {emp.status}
                  </span>

                </td>

                <td>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(emp.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}