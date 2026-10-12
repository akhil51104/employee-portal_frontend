
import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeForm from "./components/EmployeeForm";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "./services/employeeService";

import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);

  // Employees is now the only main page
  const [activePage, setActivePage] = useState("employees");

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load employees from Spring Boot
  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getEmployees();

      setEmployees(data);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to Spring Boot backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // Open Add Employee form
  const openAdd = () => {
    setSelectedEmployee(null);
    setActivePage("form");
  };

  // Open Edit Employee form
  const openEdit = (employee) => {
    setSelectedEmployee(employee);
    setActivePage("form");
  };

  // Go back to employee list
  const openEmployees = () => {
    setSelectedEmployee(null);
    setActivePage("employees");
  };

  // Create or update employee
  const handleSave = async (employee) => {
    try {
      setError("");

      if (selectedEmployee) {
        await updateEmployee(
          selectedEmployee.eid,
          employee
        );
      } else {
        await createEmployee(employee);
      }

      // Refresh employee list
      await loadEmployees();

      setSelectedEmployee(null);
      setActivePage("employees");
    } catch (err) {
      console.error(err);
      setError("Unable to save employee.");
    }
  };

  // Delete employee
  const handleDelete = async (employee) => {
    const confirmed = window.confirm(
      `Delete employee ${employee.ename}?`
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteEmployee(employee.eid);

      await loadEmployees();
    } catch (err) {
      console.error(err);
      setError("Unable to delete employee.");
    }
  };

  // Main page content
  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading-page">
          <div className="loading-spinner"></div>
          Loading employee data...
        </div>
      );
    }

    // Employees is the landing page
    if (activePage === "employees") {
      return (
        <div>
          <div className="page-title">
            <div>
              <p className="eyebrow">EMPLOYEE MANAGEMENT</p>

              <h1>Employees</h1>

              <p>
                Manage your organization's employee records.
              </p>
            </div>
          </div>

          <EmployeeTable
            employees={employees}
            onEdit={openEdit}
            onDelete={handleDelete}
            onAdd={openAdd}
          />
        </div>
      );
    }

    // Add / Edit page
    if (activePage === "form") {
      return (
        <EmployeeForm
          employee={selectedEmployee}
          onSave={handleSave}
          onCancel={openEmployees}
        />
      );
    }

    return null;
  };

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main-area">
        {/* Top header */}
        <header className="top-header">
          <div className="mobile-brand">
            EmpPortal
          </div>

          <div className="header-right">
            <span className="status-dot"></span>

            <span className="connected-label">
              System Online
            </span>

            <div className="header-avatar">
              HR
            </div>
          </div>
        </header>

        <div className="content-wrapper">
          {error && (
            <div className="error-banner">
              <span>⚠ {error}</span>

              <button onClick={loadEmployees}>
                Retry
              </button>
            </div>
          )}

          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;