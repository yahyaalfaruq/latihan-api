//products-gateway.js

let products = [];
  
module.exports.getDataProducts = () => products;
  
module.exports.getDataProductById = (id) => products.find((p) => p.id === id);
  
module.exports.getIndexDataProductById = (id) => products.findIndex((p) => p.id === id);
  
module.exports.addDataNewProduct = (name, price, stock, description, category) => {
    const newProduct = {
      id: products.length + 1,
      name,
      price,
      stock,
      description,
      category
    };
    products.push(newProduct);
    return newProduct;
  };
  
module.exports.updateDataProduct = (idx, name, price, stock, description, category) => {
    products[idx].name = name;
    products[idx].price = price;
    products[idx].stock = stock;
    products[idx].description = description;
    products[idx].category = category;
    return products[idx];
  };
  
module.exports.deleteDataProduct = (idx) => products.splice(idx, 1)[0];
  