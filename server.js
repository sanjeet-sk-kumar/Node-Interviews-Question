const express = require("express");
const {
  addEmployee,
  removeEmployee,
  updateEmployee,
  listDeptEmployees,
  getEmpByDeptName,
  readData,
} = require("./controller/employeeController");

const app = express();
app.use(express.json());

app.get("/employees", (req, res) => {
  const employees = readData();
  res.status(200).json(employees);
});

app.get("/departments", (req, res) => {
  const deptList = listDeptEmployees();
  res.status(200).send(deptList);
});

app.get("/departments/:departmentName", (req, res) => {
  const deptName = req.params.departmentName;
  const empList = getEmpByDeptName(deptName);
  return res.status(200).json({
    totalEmployees: empList.length,
    employees: empList,
  });
});

app.patch("/employees/:employeedId", (req, res) => {
  const empId = +req.params.employeedId;
  const employeeUpdates = req.body;
  const isUpdated = updateEmployee(empId, employeeUpdates);
  if (!isUpdated) {
    return res.send("The Employee with the given ID does not exist");
  } else {
    res.status(200).json({ message: "Employee Updated" });
  }
});

app.delete("/employees/:employeeId", (req, res) => {
  try {
    const id = +req.params.employeeId;
    const isDeleted = removeEmployee(id);
    if (!isDeleted) {
      return res
        .status(404)
        .json({ message: "The Employee with the given ID does not exist" });
    }
    return res.status(200).json({ message: "Employee Deleted" });
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
});

app.post("/employees", (req, res) => {
  try {
    const newEmpl = addEmployee(req.body);
    return res.status(201).json(newEmpl);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Server is running at port 5000"));
