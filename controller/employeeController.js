const fs = require("fs");
const DATA_FILE = "./data/employees.json";

const readData = () => {
  try {
    let employees = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    return employees;
  } catch (err) {
    return [];
  }
};

const writeData = (empData) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(empData, null, 2));
};

const addEmployee = (newEmployee) => {
  const employees = readData();
  if (!newEmployee.firstName) {
    throw new Error("First Name is required!");
  }
  if (!newEmployee.departmentName) {
    throw new Error("Department name is required!");
  }
  newEmployee.employeeId = Math.max(...employees.map((e) => e.employeeId)) + 1;
  employees.push(newEmployee);
  writeData(employees);
  return newEmployee;
};

const removeEmployee = (id) => {
  const employees = readData();
  const index = employees.findIndex((emp) => emp.employeeId === id);
  if (index === -1) {
    return false;
  }
  employees.splice(index, 1);
  writeData(employees);
  return true;
};

const updateEmployee = (employeeId, updatedEmployeeInfo) => {
  const employees = readData();
  const employeeIndex = employees.findIndex(
    (emp) => emp.employeeId === employeeId
  );

  if (employeeIndex === -1) {
    return false;
  } else {
    employees[employeeIndex] = {
      ...employees[employeeIndex],
      ...updatedEmployeeInfo,
    };
    writeData(employees);
    return employees[employeeIndex];
  }
};

const listDeptEmployees = () => {
  const employees = readData();
  let deptEmployees = {};
  employees.forEach((emp) => {
    const deptName = emp.departmentName.toLowerCase();
    if (!deptEmployees[deptName]) {
      deptEmployees[deptName] = [emp];
    } else {
      deptEmployees[deptName].push(emp);
    }
  });
  return deptEmployees;
};

const getEmpByDeptName = (departmentName) => {
  const departments = listDeptEmployees();
  return departments[departmentName.toLowerCase()] || [];
};

module.exports = {
  addEmployee,
  removeEmployee,
  updateEmployee,
  listDeptEmployees,
  readData,
  getEmpByDeptName,
};
