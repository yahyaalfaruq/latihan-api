const {
  getEmployeeByIdGateway,
  getEmployeesGateway,
  createEmployeeGateway,
  deleteEmployeeGateway,
  updateEmployeeGateway,
} = require("../gateways/employes-gateway");

module.exports.createEmployeeAction = (req, res) => {
  const { name, position, salary, date_hired, status } = req.body;
  const newEmployee = createEmployeeGateway(
    name,
    position,
    salary,
    date_hired,
    status
  );
  res.status(201).json({
    message: "Karyawan berhasil ditambahkan",
    employee_id: newEmployee.employee_id,
  });
};

module.exports.getEmployeesAction = (req, res) => {
  res.status(200).json(getEmployeesGateway());
};

module.exports.getEmployeeById = (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employee = getEmployeeByIdGateway(employeeId);
  if (employee) {
    res.status(200).json(employee);
  } else {
    res.status(404).json({ message: "Karyawan tidak ditemukan" });
  }
};

module.exports.updateEmployeeAction = (req, res) => {
  const employeeId = parseInt(req.params.id);
  const { name, position, salary, date_hired, status } = req.body;
  const updatedEmployee = updateEmployeeGateway(
    employeeId,
    name,
    position,
    salary,
    date_hired,
    status
  );

  if (updatedEmployee) {
    res.status(200).json({
      message: "Karyawan berhasil diperbarui",
      employee_id: updatedEmployee.employee_id,
    });
  } else {
    res.status(404).json({ message: "Karyawan tidak ditemukan" });
  }
};

module.exports.deleteEmployeeAction = (req, res) => {
  const employeeId = parseInt(req.params.id);
  const deletedEmployee = deleteEmployeeGateway(employeeId);

  if (deletedEmployee) {
    res.status(200).json({
      message: "Karyawan berhasil dihapus",
      employee_id: deletedEmployee.employee_id,
    });
  } else {
    res.status(404).json({ message: "Karyawan tidak ditemukan" });
  }
};
