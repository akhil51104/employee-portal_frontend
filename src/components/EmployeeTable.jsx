
import { useMemo, useState } from "react";

function EmployeeTable({ employees, onEdit, onDelete, onAdd }) {
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("All Cities");

  const cities = useMemo(() => {
    return [
      ...new Set(
        employees
          .map((employee) => employee.city)
          .filter(Boolean)
      ),
    ].sort();
  }, [employees]);

  const filteredEmployees = employees.filter((employee) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      String(employee.eid).includes(searchText) ||
      employee.ename?.toLowerCase().includes(searchText) ||
      employee.city?.toLowerCase().includes(searchText) ||
      employee.state?.toLowerCase().includes(searchText);

    const matchesCity =
      cityFilter === "All Cities" ||
      employee.city === cityFilter;

    return matchesSearch && matchesCity;
  });

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="directory-card">
      <div className="directory-top">
        <div>
          <h2>Employee Directory</h2>
          <p>Manage and view all your employees</p>
        </div>

        <button className="primary-btn" onClick={onAdd}>
          <span>＋</span> Add Employee
        </button>
      </div>

      <div className="table-toolbar">
        <div className="search-box">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <select
          value={cityFilter}
          onChange={(event) => setCityFilter(event.target.value)}
        >
          <option>All Cities</option>
          {cities.map((city) => (
            <option key={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="table-scroll">
        <table className="employee-table">
          <thead>
            <tr>
              <th>EMPLOYEE</th>
              <th>ID</th>
              <th>LOCATION</th>
              <th>AGE</th>
              <th>SALARY</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.eid}>
                <td>
                  <div className="employee-cell">
                    <div className="table-avatar">
                      {getInitials(employee.ename)}
                    </div>
                    <div>
                      <strong>{employee.ename}</strong>
                      <span>{employee.state}</span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="id-badge">
                    #{employee.eid}
                  </span>
                </td>

                <td>
                  <div className="location-cell">
                    <strong>{employee.city}</strong>
                    <span>{employee.state}</span>
                  </div>
                </td>

                <td>{employee.age} yrs</td>

                <td className="salary">
                  ₹{Number(employee.salary).toLocaleString("en-IN")}
                </td>

                <td>
                  <div className="table-actions">
                    <button
                      className="icon-btn edit"
                      title="Edit employee"
                      onClick={() => onEdit(employee)}
                    >
                      ✎
                    </button>

                    <button
                      className="icon-btn delete"
                      title="Delete employee"
                      onClick={() => onDelete(employee)}
                    >
                      🗑
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredEmployees.length === 0 && (
          <div className="empty-state">
            <div>⌕</div>
            <h3>No employees found</h3>
            <p>Try changing your search or filter.</p>
          </div>
        )}
      </div>

      <div className="table-footer">
        Showing <strong>{filteredEmployees.length}</strong> of{" "}
        <strong>{employees.length}</strong> employees
      </div>
    </div>
  );
}

export default EmployeeTable;