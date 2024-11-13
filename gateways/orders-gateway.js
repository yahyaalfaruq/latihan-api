let orders = [];

module.exports.getOrdersGateway = () => orders;

module.exports.getOrderByIdGateway = (orderId) => {
  return orders.find((p) => p.order_id === orderId);
};

module.exports.addOrderGateway = (customer, quantity, total_price, status) => {
  const newOrder = {
    order_id: orders.length + 1,
    customer,
    quantity,
    total_price,
    status,
  };
  orders.push(newOrder);
  return newOrder;
};

module.exports.updateOrderGateway = (
  orderId,
  customer,
  quantity,
  total_price,
  status
) => {
  const orderIndex = orders.findIndex((p) => p.order_id === orderId);
  if (orderIndex !== -1) {
    orders[orderIndex] = {
      ...orders[orderIndex],
      customer,
      quantity,
      total_price,
      status,
    };
    return orders[orderIndex];
  }
  return null; // Mengembalikan null jika pesanan tidak ditemukan
};

module.exports.deleteOrderGateway = (orderId) => {
  const orderIndex = orders.findIndex((p) => p.order_id === orderId);
  if (orderIndex !== -1) {
    const [deletedOrder] = orders.splice(orderIndex, 1);
    return deletedOrder; // Mengembalikan pesanan yang dihapus
  }
  return null; // Mengembalikan null jika pesanan tidak ditemukan
};
