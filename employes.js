const MyExpress = require("express");
const app = MyExpress();

app.use(MyExpress.json());
let employees = [];

app.post("/api/employees", (req, res) => {
  const newEmployee = {
    employee_id: employees.length + 1,
    name: req.body.name,
    position: req.body.position,
    salary: req.body.salary,
    date_hired: req.body.date_hired,
    status: req.body.status,
  };
  employees.push(newEmployee);
  res.status(200).json({
    message: "Karyawan berhasil ditambahkan",
    employee_id: newEmployee.employee_id
  });
});

app.get("/api/employees", (req, res) => {
  res.status(200).json(employees);
});

app.get("/api/employees/:id", (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employee = employees.find(p => p.employee_id === employeeId);
  if (employee) {
    res.status(200).json(employee);
  } else {
    res.status(404).send("Karyawan tidak ditemukan");
  }
});

app.put("/api/employees/:id", (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employeeIndex = employees.findIndex(p => p.employee_id === employeeId);
  if (employeeIndex !== -1) {
    employees[employeeIndex] = {
      ...employees[employeeIndex],
      name: req.body.name,
      position: req.body.position,
      salary: req.body.salary,
      date_hired: req.body.date_hired,
      status: req.body.status,
    };
    res.status(200).json({
      message: "Karyawan berhasil diperbarui",
      employee_id: employees[employeeIndex].employee_id
    });
  } else {
    res.status(404).send("Karyawan tidak ditemukan");
  }
});

app.delete("/api/employees/:id", (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employeeIndex = employees.findIndex(p => p.employee_id === employeeId);
  if (employeeIndex !== -1) {
    const deletedEmployee = employees[employeeIndex];
    employees.splice(employeeIndex, 1);
    res.status(200).json({
      message: "Karyawan berhasil dihapus",
      employee_id: deletedEmployee.employee_id
    });
  } else {
    res.status(404).send("Karyawan tidak ditemukan");
  }
});

app.listen(3000, () => {
  console.log("Employees API listening on http://localhost:3000");
});
