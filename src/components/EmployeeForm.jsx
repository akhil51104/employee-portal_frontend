
import { useEffect, useState } from "react";

const initialForm = {
  ename: "",
  salary: "",
  age: "",
  city: "",
  state: "",
};

function EmployeeForm({ employee, onSave, onCancel }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const isEditing = Boolean(employee);

  useEffect(() => {
    if (employee) {
      setForm({
        ename: employee.ename || "",
        salary: employee.salary ?? "",
        age: employee.age ?? "",
        city: employee.city || "",
        state: employee.state || "",
      });
    } else {
      setForm(initialForm);
    }

    setErrors({});
  }, [employee]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.ename.trim()) {
      newErrors.ename = "Name is required";
    }

    if (form.salary === "" || Number(form.salary) < 0) {
      newErrors.salary = "Enter a valid salary";
    }

    if (
      form.age === "" ||
      Number(form.age) < 1 ||
      Number(form.age) > 120
    ) {
      newErrors.age = "Enter a valid age";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!form.state.trim()) {
      newErrors.state = "State is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    onSave({
      ename: form.ename.trim(),
      salary: Number(form.salary),
      age: Number(form.age),
      city: form.city.trim(),
      state: form.state.trim(),
    });
  };

  return (
    <div className="form-page">
      <div className="form-page-header">
        <div>
          <p className="breadcrumb">Employees / {isEditing ? "Edit" : "New"}</p>
          <h1>{isEditing ? "Edit Employee" : "Add New Employee"}</h1>
          <p>
            {isEditing
              ? "Update employee information and save changes."
              : "Create a new employee profile in your organization."}
          </p>
        </div>
      </div>

      <form className="professional-form" onSubmit={handleSubmit}>
        <div className="form-section-title">
          <div className="form-section-icon">♙</div>
          <div>
            <h3>Personal Information</h3>
            <p>Basic details of the employee</p>
          </div>
        </div>

        <div className="form-fields">
          <div className="field">
            <label>Full Name *</label>
            <input
              name="ename"
              value={form.ename}
              onChange={handleChange}
              placeholder="Enter full name"
            />
            {errors.ename && <small>{errors.ename}</small>}
          </div>

          <div className="field">
            <label>Age *</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="Enter age"
            />
            {errors.age && <small>{errors.age}</small>}
          </div>

          <div className="field">
            <label>Salary (₹) *</label>
            <input
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              placeholder="Enter salary"
              min="0"
            />
            {errors.salary && <small>{errors.salary}</small>}
          </div>

          <div className="field">
            <label>City *</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter city"
            />
            {errors.city && <small>{errors.city}</small>}
          </div>

          <div className="field">
            <label>State *</label>
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="Enter state"
            />
            {errors.state && <small>{errors.state}</small>}
          </div>
        </div>

        <div className="form-bottom">
          <p>All fields marked with * are required.</p>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-btn"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button type="submit" className="primary-btn">
              {isEditing ? "Save Changes" : "Create Employee"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;