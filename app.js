// app.js
const express = require("express");

const {
  getProductActions,
  getProductByIdAction,
  createNewProductAction,
  updateProductAction,
  deleteProductAction,
} = require("./actions/products-action.js");

const {
  getUserById,
  addUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("./src/users-action.js");

const {
  createNewOrderAction,
  getOrdersAction,
  getOrderByIdAction,
  updateOrderAction,
  deleteOrderAction,
} = require("./actions/orders-action");

const {
  createEmployeeAction,
  getEmployeesAction,
  getEmployeeById,
  updateEmployeeAction,
  deleteEmployeeAction,
} = require("./actions/employes-action");

const {
  createBookAction,
  getBooksAction,
  getBookByIdAction,
  updateBookAction,
  deleteBookAction,
} = require("./actions/books-action");

const app = express();

// Middleware untuk mengurai JSON body
app.use(express.json());

// Products
app.get("/api/products", getProductActions);
app.get("/api/products/:id", getProductByIdAction);
app.post("/api/products", createNewProductAction);
app.put("/api/products/:id", updateProductAction);
app.delete("/api/products/:id", deleteProductAction);

// Users
app.post("/api/users", addUser);
// Mendapatkan semua pengguna
app.get("/api/users", getUsers);
// Mendapatkan pengguna berdasarkan ID
app.get("/api/users/:id", getUserById);
// Memperbarui pengguna berdasarkan ID
app.put("/api/users/:id", updateUser);
// Menghapus pengguna berdasarkan ID
app.delete("/api/users/:id", deleteUser);

// Orders
app.post("/api/orders", createNewOrderAction);
app.get("/api/orders", getOrdersAction);
app.get("/api/orders/:id", getOrderByIdAction);
app.put("/api/orders/:id", updateOrderAction);
app.delete("/api/orders/:id", deleteOrderAction);

//Employees
app.post("/api/employees", createEmployeeAction);
app.get("/api/employees", getEmployeesAction);
app.get("/api/employees/:id", getEmployeeById);
app.put("/api/employees/:id", updateEmployeeAction);
app.delete("/api/employees/:id", deleteEmployeeAction);

app.post("/api/books", createBookAction); // Endpoint untuk menambahkan buku baru
app.get("/api/books", getBooksAction); // Endpoint untuk mendapatkan semua buku
app.get("/api/books/:id", getBookByIdAction); // Endpoint untuk mendapatkan buku berdasarkan ID
app.put("/api/books/:id", updateBookAction); // Endpoint untuk memperbarui buku berdasarkan ID
app.delete("/api/books/:id", deleteBookAction); // Endpoint untuk menghapus buku berdasarkan ID

// Listen on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
