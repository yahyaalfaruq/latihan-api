const express = require("express");
const app = express();

let users = [];

let nextUserId = 1;

app.use(express.json()); // Middleware untuk parsing JSON

// Menambahkan pengguna baru
app.post("/api/users", (req, res) => {
  const { name, email, phone, role, status } = req.body;
  const newUser = {
    user_id: nextUserId++,
    name,
    email,
    phone,
    role,
    status,
  };
  users.push(newUser);
  res.status(201).json({
    message: "Pengguna berhasil ditambahkan",
    user_id: newUser.user_id,
  });
});

// Mendapatkan semua pengguna
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Mendapatkan pengguna berdasarkan ID
app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.user_id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Pengguna tidak ditemukan" });
  }
});

// Memperbarui pengguna berdasarkan ID
app.put("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.user_id === id);
  if (user) {
    const { name, email, phone, role, status } = req.body;
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.role = role;
    user.status = status;
    res.json({ message: "Pengguna berhasil diperbarui" });
  } else {
    res.status(404).json({ message: "Pengguna tidak ditemukan" });
  }
});

// Menghapus pengguna berdasarkan ID
app.delete("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.user_id === id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.json({ message: "Pengguna berhasil dihapus" });
  } else {
    res.status(404).json({ message: "Pengguna tidak ditemukan" });
  }
});

app.listen(3000, () => {
  console.log("Users API listening on http://localhost:3000");
});
