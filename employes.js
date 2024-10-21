const http = require("http");
const url = require("url");

let employees = [
  {
    employee_id: 1,
    name: "Nama Karyawan",
    position: "Manager",
    department: "HR",
    salary: 5000000,
    status: "active",
  },
];

let nextEmployeeId = 2;

const respondWithJSON = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let {pathname} = parsedUrl;
  const method = req.method;

  // Normalize path to handle trailing slash
  if (pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  if (pathname === "/api/employees" && method === "POST") {
    createEmployee(req, res);
  } else if (pathname === "/api/employees" && method === "GET") {
    readEmployees(res);
  } else if (pathname.startsWith("/api/employees/") && method === "GET") {
    const id = pathname.split("/")[2];
    readEmployeeById(res, id);
  } else if (pathname.startsWith("/api/employees/") && method === "PUT") {
    const id = pathname.split("/")[2];
    updateEmployee(req, res, id);
  } else if (pathname.startsWith("/api/employees/") && method === "DELETE") {
    const id = pathname.split("/")[2];
    deleteEmployee(res, id);
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

const createEmployee = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { name, position, department, salary, status } = JSON.parse(body);
    const newEmployee = {
      employee_id: nextEmployeeId++,
      name,
      position,
      department,
      salary,
      status,
    };
    employees.push(newEmployee);
    respondWithJSON(res, 201, {
      message: "Karyawan berhasil ditambahkan",
      employee_id: newEmployee.employee_id,
    });
  });
};

const readEmployees = (res) => {
  respondWithJSON(res, 200, employees);
};

const readEmployeeById = (res, id) => {
  const employee = employees.find((e) => e.employee_id === parseInt(id));
  if (employee) {
    respondWithJSON(res, 200, employee);
  } else {
    respondWithJSON(res, 404, { message: "Karyawan tidak ditemukan" });
  }
};

const updateEmployee = (req, res, id) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { name, position, department, salary, status } = JSON.parse(body);
    const employee = employees.find((e) => e.employee_id === parseInt(id));
    if (employee) {
      employee.name = name;
      employee.position = position;
      employee.department = department;
      employee.salary = salary;
      employee.status = status;
      respondWithJSON(res, 200, { message: "Karyawan berhasil diperbarui" });
    } else {
      respondWithJSON(res, 404, { message: "Karyawan tidak ditemukan" });
    }
  });
};

const deleteEmployee = (res, id) => {
  const employeeIndex = employees.findIndex((e) => e.employee_id === parseInt(id));
  if (employeeIndex !== -1) {
    employees.splice(employeeIndex, 1);
    respondWithJSON(res, 200, { message: "Karyawan berhasil dihapus" });
  } else {
    respondWithJSON(res, 404, { message: "Karyawan tidak ditemukan" });
  }
};

server.listen(3000, () => {
  console.log("Employees API listening on http://localhost:3000");
});
