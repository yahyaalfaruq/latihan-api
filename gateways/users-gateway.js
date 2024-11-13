let users = [];
let nextUserId = 1;

module.exports.createUser = (name, email, phone, role, status) => {
  const newUser = {
    user_id: nextUserId++,
    name,
    email,
    phone,
    role,
    status,
  };
  users.push(newUser);
  return newUser;
};

module.exports.getDataUsers = () => users;

module.exports.getDataUserById = (id) => {
  return users.find((u) => u.user_id === id);
};

module.exports.updateDataUser = (id, name, email, phone, role, status) => {
  const userIndex = users.findIndex((u) => u.user_id === id);
  if (userIndex !== -1) {
    users[userIndex] = {
      ...users[userIndex],
      name,
      email,
      phone,
      role,
      status,
    };
    return users[userIndex];
  }
  return null; // Mengembalikan null jika pengguna tidak ditemukan
};

module.exports.deleteDataUser = (id) => {
  const userIndex = users.findIndex((u) => u.user_id === id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    return true; // Mengembalikan true jika berhasil menghapus
  }
  return false; // Mengembalikan false jika pengguna tidak ditemukan
};
