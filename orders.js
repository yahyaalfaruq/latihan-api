const http = require("http");
const url = require("url");

let orders = [
  {
    order_id: 1,
    customer_name: "Nama Pelanggan",
    product_id: 1,
    quantity: 2,
    total_price: 20000,
    status: "pending",
  },
];

let nextOrderId = 2;

const respondWithJSON = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let { pathname } = parsedUrl;
  const method = req.method;

  if (pathname === "/api/orders" && method === "POST") {
    createOrder(req, res);
  } else if (pathname === "/api/orders" && method === "GET") {
    readOrders(res);
  } else if (pathname.startsWith("/api/orders/") && method === "GET") {
    const id = pathname.split("/")[3];
    readOrderById(res, id);
  } else if (pathname.startsWith("/api/orders/") && method === "PUT") {
    const id = pathname.split("/")[3];
    updateOrder(req, res, id);
  } else if (pathname.startsWith("/api/orders/") && method === "DELETE") {
    const id = pathname.split("/")[3];
    deleteOrder(res, id);
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

const createOrder = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { customer_name, product_id, quantity, total_price, status } = JSON.parse(body);
    const newOrder = {
      order_id: nextOrderId++,
      customer_name,
      product_id,
      quantity,
      total_price,
      status,
    };
    orders.push(newOrder);
    respondWithJSON(res, 201, {
      message: "Pesanan berhasil ditambahkan",
      order_id: newOrder.order_id,
    });
  });
};

const readOrders = (res) => {
  respondWithJSON(res, 200, orders);
};

const readOrderById = (res, id) => {
  const order = orders.find((o) => o.order_id === parseInt(id));
  if (order) {
    respondWithJSON(res, 200, order);
  } else {
    respondWithJSON(res, 404, { message: "Pesanan tidak ditemukan" });
  }
};

const updateOrder = (req, res, id) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { quantity, total_price, status } = JSON.parse(body);
    const order = orders.find((o) => o.order_id === parseInt(id));
    if (order) {
      order.quantity = quantity;
      order.total_price = total_price;
      order.status = status;
      respondWithJSON(res, 200, { message: "Pesanan berhasil diperbarui" });
    } else {
      respondWithJSON(res, 404, { message: "Pesanan tidak ditemukan" });
    }
  });
};

const deleteOrder = (res, id) => {
  const orderIndex = orders.findIndex((o) => o.order_id === parseInt(id));
  if (orderIndex !== -1) {
    orders.splice(orderIndex, 1);
    respondWithJSON(res, 200, { message: "Pesanan berhasil dihapus" });
  } else {
    respondWithJSON(res, 404, { message: "Pesanan tidak ditemukan" });
  }
};

server.listen(3000, () => {
  console.log("Orders API listening on http://localhost:3000");
});
