
function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand-logo">E</div>

        <div>
          <h2>EmpPortal</h2>
          <span>HR MANAGEMENT</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="sidebar-section">
        <p className="sidebar-label">WORKSPACE</p>

        <button
          className={`sidebar-link ${
            activePage === "employees" ? "selected" : ""
          }`}
          onClick={() => setActivePage("employees")}
        >
          <span>♙</span>
          Employees
        </button>

        <button
          className={`sidebar-link ${
            activePage === "form" ? "selected" : ""
          }`}
          onClick={() => setActivePage("form")}
        >
          <span>＋</span>
          Add Employee
        </button>
      </div>

      {/* Admin profile */}
      <div className="sidebar-bottom">
        <div className="admin-profile">
          <div className="avatar">HR</div>

          <div>
            <strong>Admin User</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;