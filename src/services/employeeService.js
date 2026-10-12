
const API_URL = "http://localhost:8080";

export const getEmployees = async () => {
  const response = await fetch(`${API_URL}/getEmpList`);

  if (!response.ok) {
    throw new Error("Unable to load employees");
  }

  return response.json();
};

export const createEmployee = async (employee) => {
  const response = await fetch(`${API_URL}/createEmp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error("Unable to create employee");
  }

  return response.json();
};

export const updateEmployee = async (eid, employee) => {
  const response = await fetch(`${API_URL}/updateEmp/${eid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error("Unable to update employee");
  }

  return response.json();
};

export const deleteEmployee = async (eid) => {
  const response = await fetch(`${API_URL}/delEmp/${eid}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Unable to delete employee");
  }

  return response.text();
};