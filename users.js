const http = require("http");
const url = require("url");

let users = [
  {
    user_id: 1,
    name: "Nama Pengguna",
    email: "email@example.com",
    phone: "08123456789",
    role: "member",
    status: "active",
  },
];

let nextUserId = 2;

const respondWithJSON = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let { pathname } = parsedUrl;
  const method = req.method;

  if (pathname === "/api/users" && method === "POST") {
    createUser(req, res);
  } else if (pathname === "/api/users" && method === "GET") {
    readUsers(res);
  } else if (pathname.startsWith("/api/users/") && method === "GET") {
    const id = pathname.split("/")[3];
    readUserById(res, id);
  } else if (pathname.startsWith("/api/users/") && method === "PUT") {
    const id = pathname.split("/")[3];
    updateUser(req, res, id);
  } else if (pathname.startsWith("/api/users/") && method === "DELETE") {
    const id = pathname.split("/")[3];
    deleteUser(res, id);
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

const createUser = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { name, email, phone, role, status } = JSON.parse(body);
    const newUser = {
      user_id: nextUserId++,
      name,
      email,
      phone,
      role,
      status,
    };
    users.push(newUser);
    respondWithJSON(res, 201, {
      message: "Pengguna berhasil ditambahkan",
      user_id: newUser.user_id,
    });
  });
};

const readUsers = (res) => {
  respondWithJSON(res, 200, users);
};

const readUserById = (res, id) => {
  const user = users.find((u) => u.user_id === parseInt(id));
  if (user) {
    respondWithJSON(res, 200, user);
  } else {
    respondWithJSON(res, 404, { message: "Pengguna tidak ditemukan" });
  }
};

const updateUser = (req, res, id) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { name, email, phone, role, status } = JSON.parse(body);
    const user = users.find((u) => u.user_id === parseInt(id));
    if (user) {
      user.name = name;
      user.email = email;
      user.phone = phone;
      user.role = role;
      user.status = status;
      respondWithJSON(res, 200, { message: "Pengguna berhasil diperbarui" });
    } else {
      respondWithJSON(res, 404, { message: "Pengguna tidak ditemukan" });
    }
  });
};

const deleteUser = (res, id) => {
  const userIndex = users.findIndex((u) => u.user_id === parseInt(id));
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    respondWithJSON(res, 200, { message: "Pengguna berhasil dihapus" });
  } else {
    respondWithJSON(res, 404, { message: "Pengguna tidak ditemukan" });
  }
};

server.listen(3000, () => {
  console.log("Users API listening on http://localhost:3000");
});
