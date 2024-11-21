import express, { Request, Response } from 'express';
const {
  getDataUsers,
  createUser,
  getDataUserById,
  updateDataUser,
  deleteDataUser, // Pastikan fungsi ini ada di users-gateway
} = require("../gateways/users-gateway");

module.exports.addUser = (req: Request, res: Response) => {
  const { name, email, phone, role, status } = req.body;
  const newUser = createUser(name, email, phone, role, status);
  res.status(201).json({
    message: "Pengguna berhasil ditambahkan",
    user_id: newUser.user_id,
  });
};

module.exports.getUsers = (req: Request, res: Response) => {
  res.json(getDataUsers());
};

module.exports.getUserById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = getDataUserById(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Pengguna tidak ditemukan" });
  }
};

module.exports.updateUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (id) {
    const { name, email, phone, role, status } = req.body;
    const user = updateDataUser(id, name, email, phone, role, status);
    if (user) {
      res.json({
        message: "Pengguna berhasil diperbarui",
        user_id: user.user_id,
      });
    } else {
      res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }
  } else {
    res.status(400).json({ message: "ID tidak valid" });
  }
};

module.exports.deleteUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = getDataUserById(id);
  if (user) {
    deleteDataUser(id);
    res.json({ message: "Pengguna berhasil dihapus" });
  } else {
    res.status(404).json({ message: "Pengguna tidak ditemukan" });
  }
};
