let employees = [];

module.exports.getEmployeesGateway = () => employees;

module.exports.getEmployeeByIdGateway = (employeeId) => {
  const employee = employees.find((p) => p.employee_id === employeeId);
  return employee;
};

module.exports.createEmployeeGateway = (
  name,
  position,
  salary,
  date_hired,
  status
) => {
  const newEmployee = {
    employee_id: employees.length + 1,
    name,
    position,
    salary,
    date_hired,
    status,
  };
  employees.push(newEmployee);
  return newEmployee;
};

module.exports.updateEmployeeGateway = (employeeId,name,position,salary,date_hired,status) => {
    const employeeIndex = employees.findIndex((p) => p.employee_id === employeeId);
  if (employeeIndex !== -1) {
    employees[employeeId] = {
      ...employees[employeeId],
      name,
      position,
      salary,
      date_hired,
      status
    };
    return employees[employeeIndex];
  }
};

module.exports.deleteEmployeeGateway = (employeeId) => {
    const employeeIndex = employees.findIndex((p) => p.employee_id === employeeId);
    if (employeeIndex !== -1) {
      const [deletedEmployee] = orders.splice(orderIndex, 1);
      return deletedEmployee; // Mengembalikan pesanan yang dihapus
    }
};