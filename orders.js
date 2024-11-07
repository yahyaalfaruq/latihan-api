const MyExpress = require("express");
const app = MyExpress();

app.use(MyExpress.json());
let orders = [];

app.post("/api/orders", (req, res) => {
  const newOrder = {
    order_id: orders.length + 1,
    customer_name: req.body.customer_name,
    quantity: req.body.quantity,
    total_price: req.body.total_price,
    status: req.body.status,
  };
  orders.push(newOrder);
  res.status(200).json({
    message: "Pesanan berhasil ditambahkan",
    order_id: newOrder.order_id,
  });
});

app.get("/api/orders", (req, res) => {
  res.status(200).json(orders);
});

app.get("/api/orders/:id", (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find((p) => p.order_id === orderId);
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).send("Pesanan tidak ditemukan");
  }
});

app.put("/api/orders/:id", (req, res) => {
  const orderId = parseInt(req.params.id);
  const orderIndex = orders.findIndex((p) => p.order_id === orderId);
  if (orderIndex !== -1) {
    orders[orderIndex] = {
      ...orders[orderIndex],
      customer_name: req.body.customer_name,
      quantity: req.body.quantity,
      total_price: req.body.total_price,
      status: req.body.status,
    };
    res.status(200).json({
      message: "Pesanan berhasil diperbarui",
      order_id: orders[orderIndex].employee_id,
    });
  } else {
    res.status(404).send("Pesanan tidak ditemukan");
  }
});

app.delete("/api/orders/:id", (req, res) => {
  const orderId = parseInt(req.params.id);
  const orderIndex = orders.findIndex(p => p.order_id === orderId);
  if (orderIndex !== -1) {
    const deletedOrder = orders[orderIndex];
    orders.splice(orderIndex, 1);
    res.status(200).json({
      message: "Pesanan berhasil dihapus",
      order_id: deletedOrder.order_id
    });
  } else {
    res.status(404).send("Pesanan tidak ditemukan");
  }
});

app.listen(3000, () => {
  console.log("Orders API listening on http://localhost:3000");
});
