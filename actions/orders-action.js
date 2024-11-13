const {
  getOrdersGateway,
  getOrderByIdGateway,
  addOrderGateway,
  updateOrderGateway,
  deleteOrderGateway,
} = require("../gateways/orders-gateway");

module.exports.createNewOrderAction = (req, res) => {
  const { item, quantity, price, customerId } = req.body;
  const newOrder = addOrderGateway(item, quantity, price, customerId);
  res.status(201).json({
    message: "Pesanan berhasil ditambahkan",
    order_id: newOrder.order_id,
  });
};

module.exports.getOrdersAction = (req, res) => {
  const orders = getOrdersGateway();
  res.status(200).json(orders);
};

module.exports.getOrderByIdAction = (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = getOrderByIdGateway(orderId);
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ message: "Pesanan tidak ditemukan" });
  }
};

module.exports.updateOrderAction = (req, res) => {
  const orderId = parseInt(req.params.id);
  const { item, quantity, price, customerId } = req.body;
  const updatedOrder = updateOrderGateway(
    orderId,
    item,
    quantity,
    price,
    customerId
  );
  if (updatedOrder) {
    res.status(200).json({
      message: "Pesanan berhasil diperbarui",
      order_id: updatedOrder.order_id,
    });
  } else {
    res.status(404).json({ message: "Pesanan tidak ditemukan" });
  }
};

module.exports.deleteOrderAction = (req, res) => {
  const orderId = parseInt(req.params.id);
  const deletedOrder = deleteOrderGateway(orderId);
  if (deletedOrder) {
    res.status(200).json({
      message: "Pesanan berhasil dihapus",
      order_id: deletedOrder.order_id,
    });
  } else {
    res.status(404).json({ message: "Pesanan tidak ditemukan" });
  }
};
